<template>
  <div class="channel-detail">

    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/home/channel' }">渠道列表</el-breadcrumb-item>
          <el-breadcrumb-item>渠道号详情</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="list-header" >
        <div class="title">渠道号数据详情</div>
      </div>
      <div style="padding:20px;border:1px solid #eee;box-sizing: border-box;min-width:1200px">
        <div id="chart-bar" :style="{width: '600px', height: '400px'}" style="display: inline-block;"></div>
        <div id="chart-pie" :style="{width: '400px', height: '400px'}" style="display: inline-block"></div>
      </div>


    </div>

  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件;
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/pie');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/toolbox');
  require('echarts/lib/component/title');
  export default {

    name: 'channel-detail',
    data () {
      return {
        barData:[

        ],
        barX:[],
        pieData:[

        ]


      }
    },
    methods: {
      drawLine(barData,barX,pieData) {
        // 基于准备好的dom，初始化echarts实例
        let chartBar = echarts.init(document.getElementById('chart-bar'));
        let chartPie = echarts.init(document.getElementById('chart-pie'));
        // 绘制图表
        chartBar.setOption({
          //图表标题
          title: { text: '各层用户人数数量统计：' },
          //鼠标悬浮显示数据tip
          tooltip : {
            show: true,
          },
          //图表切换工具箱
          toolbox: {
            show : true,
            x:"right",
            feature : {
              magicType : {show: true, type: ['line', 'bar']},
              saveAsImage : {show: true}
            }
          },
          //横轴
          xAxis: {
            type:"category",
            data: barX,
          },
          //纵轴
          yAxis: {
            type:"value",
            name:"人数",
            nameLocation:"end",
            position:"left",
            max:100,
            min:0,
            splitNumber:5,
          },
          series: [
            {
              name: '人数',
              type: 'bar',
              data: barData, //图表数据
              // 图表样式
              itemStyle: {
                normal: {
                  borderRadius: 5,
                  color: "steelblue",
                  //图表数据标签
                  label: {
                    show: true,
                    position:'outside',
                    textStyle: {
                      fontSize: '18',
                      fontFamily: '微软雅黑',
                      fontWeight: 'bold'
                    }
                  }
                }
              }
            }
          ]
        });


        chartPie.setOption({
          title : {
            text: '各层人数占百分比',
            subtext: '',
            x:'center'
          },
          tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:pieData,
              itemStyle: {
                normal: {
                  borderRadius: 5,
                  //图表数据标签
                  label: {
                    show: true,
                    position:'outside',
                    textStyle: {
                      fontSize: '18',
                      fontFamily: '微软雅黑',
                      fontWeight: 'bold'
                    }
                  }
                }
              },
              color:[
                'green', 'steelblue', '#cd5c5c', 'orange', '#40e0d0',
              ],

            }
          ]
        });
      },
      getNextUserInfo(){
        this.$post('/get_next_user_info',{appid:this.$route.query.appid,chn_id:this.$route.query.chn_id})
          .then((res)=>{
            console.log(res.data_map_count);
            let dataMap = res.data_map_count;
            for(let i in dataMap){
              this.barData.push(dataMap[i]);

            }
            console.log("barData:",this.barData);
            for(let i=1;i<this.barData.length+1;i++){
              this.barX.push(`第${i}层`)
            }
            console.log("barX:",this.barX);
            for(let i=1;i<this.barData.length+1;i++){
              let obj = {};
              obj.value = this.barData[i-1];
              obj.name = `第${i}层`;
              this.pieData.push(obj);
            }
            console.log("pieData:",this.pieData);
            this.drawLine(this.barData,this.barX,this.pieData);
          })
      }
    },
    created(){

    },
    mounted() {
      this.getNextUserInfo();

    },
  }
</script>

<style scoped>

</style>
