<template>
  <div class="china-map-container">
    <ChartTitle>商家分布</ChartTitle>

    <div class="china-map-chart">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChartTitle from "@/components/ChartTitle.vue";
import { onMounted, ref } from "vue";
import chinaJson from "@/assets/data/china.json";
import mapData from "@/assets/data/map.json";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";
import { useScreenStore } from "@/store/useScreen";

// 配置对象
const option = ref({});
const screenStore = useScreenStore();

// 注册地图
echarts.registerMap("china", chinaJson as any);

// 设置配置对象
const setOption = () => {
  option.value = {
    geo: {
      // type: "map",
      map: "china",
      top: "5%",
      bottom: "5%",
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        areaColor: "#2c3e50",
        borderColor: "#111",
      },
    },
    legend: {
      left: "5%",
      bottom: "5%",
      orient: "vertical",
      data: mapData.map((item) => item.name),
      textStyle: {
        color: "#aaa",
      },
    },
    series: mapData.map((item) => {
      return {
        type: "effectScatter", // 散点
        rippleEffect: {
          scale: 5,
          brushType: "stroke",
        },
        name: item.name,
        data: item.children,
        coordinateSystem: "geo",
      };
    }),
  };
};

onMounted(() => {
  setOption();
});
</script>

<style scoped lang="scss">
.china-map-container {
  width: 900px;
  height: 1000px;

  .china-map-chart {
    width: 100%;
    height: 92%;
  }
}
</style>
