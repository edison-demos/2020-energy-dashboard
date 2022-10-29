<template lang="pug">
    LineChart(:chart-data="chartData" :options="chartOptions")
</template>
<script>

import { convertAnalysisDayChartData, chartLines } from '../../dataConvert.js'

export default {
    props: ['analysisData', 'region', 'disables'],
    computed: {
        chartData () {
            return convertAnalysisDayChartData(this.analysisData.day, this.region, this.disables)
        },
        chartOptions () {
            return {
                animation: {
                    duration: 0,
                },
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'right',
                    align: 'end',
                },
                title: {
                    display: true,
                    // text: '統計圖',
                    fontSize: 16,
                },
                scales: {
                    yAxes: chartLines.map((cl, cli) => ({
                        id: cl.yAxisID,
                        display: false,
                    })),
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                    }],
                },
            }
        },
    },
}
</script>