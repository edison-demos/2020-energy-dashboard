<template lang="pug">
    LineChart(:chart-data="chartData" :options="options" :disables="disables")
</template>
<script>

import { convertPowerAnalysisHourWeekChartData, chartLines } from '../../dataConvert.js'

export default {
    props: ['analysisData', 'region', 'disables'],
    data () {
        return {
            dayChartData: {},
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    // text: 'ćšćæć',
                    fontSize: 16,
                },
                legend: {
                    display: false,
                    position: 'right',
                    align: 'end',
                },
                scales: {
                    yAxes: chartLines.map(cl => ({
                        id: cl.yAxisID,
                        display: false,
                    })),
                },
            },
        }
    },
    computed: {
        chartData () {
            return convertPowerAnalysisHourWeekChartData(this.analysisData.week, this.region, true, this.disables)
        },
    },
}
</script>