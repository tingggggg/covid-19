var ec_center3 = echarts.init(document.getElementById("c3"), "dark")

optionCenter3 = {
    title: {
        text: '縣市單日新增趨勢'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['確診人數', '隔離人數', '死亡人數', '解封指數', '解封指數', '解封指數']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['前7天', '前6天', '前5天', '前4天', '前3天', '前2天', '前1天']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '確診人數',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '隔離人數',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '死亡人數',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '解封指數',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '確診人數',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '確診人數',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
        }
    ]
};
ec_center3.setOption(optionCenter3);