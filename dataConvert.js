import moment from 'moment'
import arcTable from './arc'

export const colors = [
	'#cd256f',
	'#ef9424',
	'#20a7d9',
	'#79b045',
	'#89328a',
	'#086db0',
	'#c7def8',
	'#fc2929',
	'#fad8c7',
	'#fbca04',
	'#84b6eb',
	'#00cccc',
	'#159818',
	'#eb6420',
	'#bfe5bf',
	'#f7c6c7',
	'#d4c5f9',
	'#cc317c',
	'#207de5',
	'#b1eadc'
]

export const chartLines = [{
	name: '總輸入功率',
	key: 'active_power',
	diffMode: false,
	sumary: true,
}, {
	name: '總輸出功率',
	key: 'loadside_power',
	diffMode: false,
	sumary: true,
}, {
	name: '總視在功率',
	key: 'apparent_power',
	diffMode: false,
	sumary: true,
}, {
	name: '平均亮度',
	key: 'device_arc',
	diffMode: false,
	sumary: false,
}, {
	name: '平均使用時間率',
	key: 'light_source_on_time',
	diffMode: true,
	sumary: false,
}, {
	name: '平均能耗使用率(輸出)',
	key: 'output_usage',
	diffMode: false,
	sumary: true,
}, {
	name: '平均能耗使用率(輸入)',
	key: 'input_usage',
	diffMode: false,
	sumary: true,
}, {
	name: '啟動總次數',
	key: 'light_source_start_count',
	diffMode: true,
	sumary: false,
}, {
	name: '驅動器最高溫度',
	key: 'control_gear_temperature',
	sumary: false,
	maxMode: true,
}, {
	name: '平均頻率',
	key: 'control_gear_voltage_frequence',
	sumary: false,
}, {
	name: '平均輸入電壓',
	key: 'control_gear_voltage',
	sumary: false,
}, {
	name: '平均功率因數',
	key: 'control_gear_power_factor',
	sumary: false,
}]

function caculateOntimeRate (currentData, previousData, key) {
	const startM = moment(previousData.created_at)
	const endM = moment(currentData.created_at)

	const duration = moment.duration(endM.diff(startM))
	const diffSecond = duration.asSeconds()
	return Math.min(100, 100 * (currentData[key] - previousData[key]) / diffSecond)
}

export function convertRegionChartData(energyData, region = [], ignoreIndexes = []) {
	let colorIndex = 0
	let returnData = {
		datasets: [],
	}
	let gids = region.gears.map(g => g.id)
	let maxlengthGid = gids.reduce((idThis, idNext) => {
		return energyData[idThis].length > energyData[idNext].length ? idThis : idNext
	})
	let gidCount = gids.length
	let pOutSum = region.gears.map(g => g.power_out).reduce((a, b) => a + b)
	let pInSum = region.gears.map(g => g.power_in).reduce((a, b) => a + b)

	for (let { name: lineName, key: colKey, sumary, diffMode, maxMode, yAxisID } of chartLines) {
		let ds = []
		for (let [dataLengthIndex, maxLengthData] of energyData[maxlengthGid].entries()) {
			let pointDate = moment(maxLengthData.created_at)
			const nextSubKey = dataLengthIndex + 1
			if (!energyData[maxlengthGid][nextSubKey]) continue // skip last value since cannot get diff value
			let maxValueArray = []
			let sumaryValue = 0

			for (let gid of gids) {
				let currentData = energyData[gid][dataLengthIndex]
				let previousData = energyData[gid][nextSubKey]
				if (!currentData || !previousData) continue
				
				maxValueArray.push(currentData[colKey])
				let value = currentData[colKey]
				
				if (diffMode) {
					value = currentData[colKey] - previousData[colKey]
				}
				
				if (colKey.includes('on_time')) {
					// handle special key case
					value = caculateOntimeRate(currentData, previousData, colKey)
				}

				if (colKey === 'device_arc') {
					value = arcTable[value]
				}

				if (colKey === 'output_usage') {
					// power out rate
					value = currentData.loadside_power
				}

				if (colKey === 'input_usage') {
					// power in rate
					value = currentData.active_power
				}

				sumaryValue += value
			}
			
			// using unshift since we make handle from tail
			let groupedValue = sumaryValue
			// sumary mode
			if (!sumary) {
				// avg mode
				groupedValue = sumaryValue / gidCount
			}
			
			if (colKey === 'output_usage') {
				// power out rate
				groupedValue = sumaryValue / pOutSum * 100
			}

			if (colKey === 'input_usage') {
				// power in rate
				groupedValue = sumaryValue / pInSum * 100
			}

			if (maxMode) {
				groupedValue = Math.max(...maxValueArray)
			}

			ds.push({
				x: pointDate.format(),
				y: groupedValue.toFixed(2)
			})
		}
		if (ignoreIndexes.includes(colorIndex)) {
			colorIndex++
			continue
		}
		returnData.datasets.push({
			yAxisID,
			label: lineName,
			fill: false,
			tension: 0,
			borderColor: colors[colorIndex++],
			data: [...ds],
		})
	}
	return returnData
}

export const analysisOptions = [ "輸入耗能",  "視在耗能",  "負載耗能",  "平均啟動次數",  "平均使用率",  "平均亮度"]

export function convertAnalysisDayChartData (aData, region, ignoreIndexes) {
	let gids = region.gears.map(g => g.id)
	let maxlengthGid = gids.reduce((idThis, idNext) => {
		return aData[idThis].length > aData[idNext].length ? idThis : idNext
	})
	let lineE0 = [], lineE1 = [], lineE2 = []
	let lineCount = [], lineRate = []
	let lineArc = []

	let skipFirstDayData = true
	for (let dailyData of aData[maxlengthGid]) {
		if (skipFirstDayData) {
			skipFirstDayData = false
			continue
		}
		let date = moment(dailyData.created_at)
		let nextDate = moment(dailyData.created_at).subtract(1, 'day')
		let energy = {
			l0: 0,
			l1: 0,
			l2: 0,
		}
		let onTimeRateSumary = 0
		let startCount = 0
		let arcSum = 0 // WIP

		for (let gid of gids) {
			let matchedData = aData[gid].find(d => date.isSame(d.created_at, 'day'))
			let matchedDataPrev = aData[gid].find(d => nextDate.isSame(d.created_at, 'day'))
			if (!matchedData || !matchedDataPrev) continue
			energy.l0 += matchedData.active_energy - matchedDataPrev.active_energy
			energy.l1 += matchedData.apparent_energy - matchedDataPrev.apparent_energy
			energy.l2 += matchedData.loadside_energy - matchedDataPrev.loadside_energy

			onTimeRateSumary += caculateOntimeRate(matchedData, matchedDataPrev, 'light_source_on_time')
			startCount += matchedData.light_source_start_count - matchedDataPrev.light_source_start_count
			arcSum += matchedData.device_arc
		}
		

		lineE0.push({
			x: date.format('YYYY-MM-DD'),
			y: (energy.l0 / gids.length).toFixed(2)
		})
		lineE1.push({
			x: date.format('YYYY-MM-DD'),
			y: (energy.l1 / gids.length).toFixed(2)
		})
		lineE2.push({
			x: date.format('YYYY-MM-DD'),
			y: (energy.l2 / gids.length).toFixed(2)
		})

		lineCount.push({
			x: date.format('YYYY-MM-DD'),
			y: (startCount / gids.length).toFixed(0)
		})

		lineRate.push({
			x: date.format('YYYY-MM-DD'),
			y: (onTimeRateSumary / gids.length).toFixed(0)
		})

		lineArc.push({
			x: date.format('YYYY-MM-DD'),
			y: (arcSum / gids.length).toFixed(2)
		})
	}
	let datasetsAll = [{
			yAxisID: 'a',
			borderColor: colors[0],
			fill: false,
			tension: 0,
			label: "輸入耗能",
			data: lineE0,
		}, {
			yAxisID: 'a',
			borderColor: colors[1],
			fill: false,
			tension: 0,
			label: "視在耗能",
			data: lineE1,
		}, {
			yAxisID: 'a',
			borderColor: colors[2],
			fill: false,
			tension: 0,
			label: "負載耗能",
			data: lineE2,
		}, {
			yAxisID: 'd',
			borderColor: colors[3],
			fill: false,
			tension: 0,
			label: "平均啟動次數",
			data: lineCount,
		}, {
			yAxisID: 'e',
			borderColor: colors[4],
			fill: false,
			tension: 0,
			label: "平均使用率",
			data: lineRate,
		}, {
			yAxisID: 'f',
			borderColor: colors[5],
			fill: false,
			tension: 0,
			label: "平均亮度",
			data: lineArc,
		}]

	let datasetFilteredWithIgnore = datasetsAll.filter((v, index) => {
		return !ignoreIndexes.includes(index)
	})
	return {
		datasets: datasetFilteredWithIgnore,
	}
}

export function convertAnalysisHourChartData (aData, region, isWeek, ignoreIndexes) {
	let gids = region.gears.map(g => g.id)
	let labels = []
	let energyYs = []
	let onTimeYs = []
	let startCountYs = []

	let iter = Array(24).keys()
	if (isWeek) iter = Array(7).keys()
	
	let lineE0 = [], lineE1 = [], lineE2 = []
	let lineCount = [], lineRate = []
	let lineArc = []

	for (let beginPoint of iter) {
		labels.push(beginPoint)

		let energy = {
			l0: 0,
			l1: 0,
			l2: 0,
		}

		let onTimeRateSumary = 0
		let startCount = 0
		let arcSum = 0 // WIP

		for (let gid of gids) {
			if (!aData[gid]) continue
			energy.l0 += aData[gid][beginPoint].active_energy
			energy.l1 += aData[gid][beginPoint].apparent_energy
			energy.l2 += aData[gid][beginPoint].loadside_energy		

			onTimeRateSumary += aData[gid][beginPoint].light_source_on_time
			startCount += aData[gid][beginPoint].light_source_start_count
			
			arcSum += aData[gid][beginPoint].device_arc
		}

		lineE0.push((energy.l0 / gids.length).toFixed(2))
		lineE1.push((energy.l1 / gids.length).toFixed(2))
		lineE2.push((energy.l2 / gids.length).toFixed(2))

		lineCount.push((startCount / gids.length).toFixed(0))

		lineRate.push((onTimeRateSumary / gids.length).toFixed(0))

		lineArc.push((arcSum / gids.length).toFixed(2))
	}

	if (isWeek) labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

	let datasetsAll = [{
		yAxisID: 'a',
		borderColor: colors[0],
		fill: false,
		tension: 0,
		label: "輸入耗能",
		data: lineE0,
	}, {
		yAxisID: 'a',
		borderColor: colors[1],
		fill: false,
		tension: 0,
		label: "視在耗能",
		data: lineE1,
	}, {
		yAxisID: 'a',
		borderColor: colors[2],
		fill: false,
		tension: 0,
		label: "負載耗能",
		data: lineE2,
	}, {
		yAxisID: 'd',
		borderColor: colors[3],
		fill: false,
		tension: 0,
		label: "平均啟動次數",
		data: lineCount,
	}, {
		yAxisID: 'e',
		borderColor: colors[4],
		fill: false,
		tension: 0,
		label: "平均使用率",
		data: lineRate,
	}, {
		yAxisID: 'f',
		borderColor: colors[5],
		fill: false,
		tension: 0,
		label: "平均亮度",
		data: lineArc,
	}]
	let datasetFilteredWithIgnore = datasetsAll.filter((v, index) => {
		return !ignoreIndexes.includes(index)
	})
	
	return {
		labels,
		datasets: datasetFilteredWithIgnore,
	}

}

export function convertErrorChartData (aData, isStatus) {
	let datasets = []
	const errorKeys = {
		'light_source_faiture_count': '輸出錯誤次數',
		'light_source_short_count': '輸出短路次數',
		'light_source_open_count': '輸出開路次數',
		'light_source_thermal_derating_count': '光源降載次數',
		'light_source_thermal_shutdown_count': '光源過熱關閉次數',
	}

	const statusKeys = {
		'device_arc': 				'　亮度　',
		'light_source_voltage':		'　輸出電壓　',
		'light_source_current': 	'　輸出電流　',
		'light_source_temperature': '　光源溫度　',
		'light_source_start_count': '　輸出啟動次數　',
		'light_source_on_time': 	'　輸出啟動時間　',
	}
	let colorIndex = 0

	const yAxisKeys = isStatus ? statusKeys : errorKeys

	for (let ekey in yAxisKeys) {
		let label = yAxisKeys[ekey]
		let points = []
		aData.forEach((cur, i) => {
			let next = aData[i + 1]
			if (next) {
				let pointDate = moment(cur.created_at)
				let v = cur[ekey]
				if (ekey === 'device_arc') v = arcTable[v]
				
				points.push({
					x: pointDate.format(),
					y: v,
				})
			}
		})
		let ds = {
			label,
			fill: false,
			tension: 0,
			borderColor: colors[colorIndex++],
			data: [...points],
		}
		if (isStatus) {
			ds.yAxisID = chartLines[colorIndex].yAxisID
		}
		datasets.push(ds)
		
	}

	return {
		datasets,
	}
}

export const powerOptions = ["輸入電壓", "輸入電壓頻率", "負載耗能"]

export function convertPowerAnalysisDayChartData (aData, region, ignoreIndexes) {
	let gids = region.gears.map(g => g.id)
	let maxlengthGid = gids.reduce((idThis, idNext) => {
		return aData[idThis].length > aData[idNext].length ? idThis : idNext
	})
	let lineE0 = [], lineE1 = [], lineE2 = []
	let prevEnergy = 0
	for (let dailyData of aData[maxlengthGid]) {
		let date = moment(dailyData.created_at)
		let energy = {
			l0: 0,
			l1: 0,
			l2: 0,
		}

		for (let gid of gids) {
			let matchedData = aData[gid].find(d => date.isSame(d.created_at, 'day'))
			if (!matchedData) continue
			energy.l0 += matchedData.control_gear_voltage
			energy.l1 += matchedData.control_gear_voltage_frequence
			energy.l2 += matchedData.loadside_energy
		}

		lineE0.push({
			x: date.format('YYYY-MM-DD'),
			y: (energy.l0 / gids.length).toFixed(2)
		})
		lineE1.push({
			x: date.format('YYYY-MM-DD'),
			y: (energy.l1 / gids.length).toFixed(2)
		})
		
		let newEner = (energy.l2 / gids.length)
		let diffE = newEner - prevEnergy
		prevEnergy = newEner

		lineE2.push({
			x: date.format('YYYY-MM-DD'),
			y: (diffE).toFixed(2)
		})

	}

	lineE1.shift()
	lineE2.shift()
	lineE0.shift()
	let returnData = {
		datasets: [{
			yAxisID: 'a',
			borderColor: colors[0],
			fill: false,
			tension: 0,
			label: "輸入電壓",
			data: lineE0,
		}, {
			yAxisID: 'b',
			borderColor: colors[1],
			fill: false,
			tension: 0,
			label: "輸入電壓頻率",
			data: lineE1,
		}, {
			yAxisID: 'c',
			borderColor: colors[2],
			fill: false,
			tension: 0,
			label: "負載耗能",
			data: lineE2,
		}],
	}
	returnData.datasets = returnData.datasets.filter((ds, dsi) => {
		return !ignoreIndexes.includes(dsi)
	})
	
	return returnData
}

export function convertPowerAnalysisHourWeekChartData (aData, region, isWeek, ignoreIndexes) {
	let gids = region.gears.map(g => g.id)
	let labels = []

	let iter = Array(24).keys()
	if (isWeek) iter = Array(7).keys()
	
	let lineE0 = [], lineE1 = [], lineE2 = []

	for (let beginPoint of iter) {
		labels.push(beginPoint)

		let energy = {
			l0: 0,
			l1: 0,
			l2: 0,
		}

		for (let gid of gids) {
			if (!aData[gid]) continue
			energy.l0 += aData[gid][beginPoint].control_gear_voltage
			energy.l1 += aData[gid][beginPoint].control_gear_voltage_frequence
			energy.l2 += aData[gid][beginPoint].loadside_energy
		}

		lineE0.push((energy.l0 / gids.length).toFixed(2))
		lineE1.push((energy.l1 / gids.length).toFixed(2))
		lineE2.push((energy.l2 / gids.length).toFixed(2))

	}
	if (isWeek) labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

	return {
		labels,
		datasets: [{
			yAxisID: 'a',
			borderColor: colors[0],
			fill: false,
			tension: 0,
			label: "輸入電壓",
			data: lineE0,
		}, {
			yAxisID: 'b',
			borderColor: colors[1],
			fill: false,
			tension: 0,
			label: "輸入電壓頻率",
			data: lineE1,
		}, {
			yAxisID: 'c',
			borderColor: colors[2],
			fill: false,
			tension: 0,
			label: "負載耗能",
			data: lineE2,
		}].filter((ds, dsi) => {
			return !ignoreIndexes.includes(dsi)
		}),
	}
}