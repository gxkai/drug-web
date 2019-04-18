<template>
  <div>
    <div ref="channel" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
  import ECharts from 'echarts'
  import Component from 'class-component'

  @Component
  export default class channel {
    colorData = ['#BC8DEE', '#8693F3', '#89C3F8', '#F2A695', '#FCC667', '#AEB7F9', '#748BFA']
    legendData = ['工种1', '工种2', '工种3', '工种4', '工种5']
    seriesData = [
      {
        name: '工种1',
        value: 13
      },
      {
        name: '工种2',
        value: 25
      },
      {
        name: '工种3',
        value: 27
      },
      {
        name: '工种4',
        value: 30
      },
      {
        name: '工种5',
        value: 20
      }
    ];

    option = {
      color: this.colorData,
      legend: {
        orient: 'vartical',
        x: 'left',
        top: '40%',
        left: '80%',
        bottom: '0%',
        data: this.legendData,
        itemWidth: 20,
        itemHeight: 14,
        itemGap: 15,
        formatter: function (name) {
          return '   ' + name
        }
      },
      tooltip: {},
      series: [{
        name: '违规次数',
        type: 'pie',
        clockwise: false, // 饼图的扇区是否是顺时针排布
        minAngle: 20, // 最小的扇区角度（0 ~ 360）
        radius: ['40%', '58%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { // 图形样式
          normal: {
            borderColor: '#FFF',
            borderWidth: 5
          }
        },
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        data: this.seriesData
      }]
    }

    initConversion (ele) {
      let channel = ECharts.init(ele)

      channel.setOption(this.option)

      setTimeout(() => {
        channel.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        })

        channel.on('mouseover', params => {
          if (params.name === this.seriesData[0].name) {
            channel.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
          } else {
            channel.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: 0
            })
          }
        })

        channel.on('mouseout', params => {
          channel.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
        })
      }, 1000)

      // 自适应大小
      window.addEventListener('resize', () => {
        channel.resize()
      })
    }

    mounted () {
      this.$nextTick(() => {
        this.initConversion(this.$refs.channel)
      })
    }
  }
</script>
