var ec_center = echarts.init(document.getElementById("c2"), "dark")

optionCenter = {
    title: {
        text: '全國累計趨勢'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['確診人數', '隔離人數', '死亡人數', '解封指數']
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
        axisLabel: {
            rotate: 30
        },
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
        }
    ]
};
ec_center.setOption(optionCenter);