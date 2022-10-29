<template lang="pug">
    LineChart(:chart-data="chartData" :options="options" :disables="disables")
</template>
<script>

import { convertAnalysisHourChartData, chartLines } from '../../dataConvert.js'

export default {
    props: ['analysisData', 'region', 'disables'],
    data () {
        return {
            dayChartData: {},
            options: {
                animation: {
                    duration: 0,
                },
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: '區間小時統計圖',
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
            return  convertAnalysisHourChartData(this.analysisData.hour, this.region, false, this.disables)
        },
    },

}
</script>