<template lang="pug">
    LineChart(:chart-data="chartData" :options="options" :disables="disables")
</template>
<script>

import { convertPowerAnalysisDayChartData, chartLines } from '../../dataConvert.js'

export default {
    props: ['analysisData', 'region', 'disables'],
    data () {
        return {
            options: {
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
                    yAxes: chartLines.map(cl => ({
                        id: cl.yAxisID,
                        display: false,
                    })),
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                    }],
                },
            },
        }
    },
    computed: {
        chartData () {
            return convertPowerAnalysisDayChartData(this.analysisData.day, this.region, this.disables)
        },
    },
}
</script>