<template>
    <div class="box">
      <div id="main"></div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "goods/cateList"
    })
  },
  methods: {
    ...mapActions({
      reqList: "goods/getCateList"
    })
  },
  mounted() {
    //1.一进来发请求
    this.reqList();
  },
  watch: {
    // 2.监听
    list: {
      handler() {
        if (this.list.length > 0) {


          //画图
          let mychart = require("echarts").init(
            document.getElementById("main")
          );
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "分类数量"
            },
            tooltip: {},
            legend: {
              data: ["分类数量"]
            },
            xAxis: {
              data: this.list.map(item => item.catename)
            },
            yAxis: {},
            // series:数据
            series: [
              {
                name: "分类数量",
                type: "bar",
                data: this.list.map(item => item.children ? item.children.length : 0)
              },
            ]
          };

          mychart.setOption(option);
        }
      },
      deep: true
    }
  },

};
</script>
<style scoped>
.box{
  display: flex;
  align-items: center;
  justify-content: center;
}
#main {
  width: 800px;
  height: 400px;
  margin: auto;
  padding: 0;
  box-shadow:#ccc 0 0 50px 0 ;
}
</style>
