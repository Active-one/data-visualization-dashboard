<template>
  <div class="trend-line-container">
    <ChartTitle>地区销量趋势</ChartTitle>

    <!-- 图表容器 -->
    <div class="trend-line-chart">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";
import ChartTitle from "@/components/ChartTitle.vue";
import type { TrendType } from "@/types";
import { useWebsocket } from "@/hooks/useWebsocket";
const { subscribe } = useWebsocket(
  import.meta.env.PROD ? window.location.origin : "http://localhost:3000",
);

// 渐变颜色值数组
const colorArr = [
  "rgba(11, 168, 44, 0.5)",
  "rgba(44, 110, 255, 0.5)",
  "rgba(22, 242, 217, 0.5)",
  "rgba(254, 33, 30, 0.5)",
  "rgba(250, 105, 0, 0.5)",
];

const option = ref({});

// 初始化设置option
const initSetOption = () => {
  option.value = {
    legend: {
      top: "8%",
      left: 20,
      icon: "circle",
      data: [],
      textStyle: {
        color: "#aaa",
      },
    },
    grid: {
      left: "10%",
      right: "4%",
      top: "20%",
      bottom: "8%",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      boundaryGap: false,
      axisLabel: { color: "#777" },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#777" },
    },
    series: [],
  };
};

// 更新设置option
const updateSetOption = (data: TrendType[]) => {
  console.log(data);

  option.value = {
    legend: {
      data: data.map((item) => item.name),
    },
    series: getSeries(data),
  };
};

const getSeries = (data: TrendType[]) => {
  return data.map((item, index) => {
    return {
      type: "line",
      name: item.name,
      data: item.value,
      lineStyle: {
        width: 4,
      },
      itemStyle: {
        borderWidth: 5,
      },
      smooth: true,
      symbolSize: 0,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr[index],
          },
          {
            offset: 1,
            color: colorArr[index].replace("0.5", "0"),
          },
        ]),
      },
    };
  });
};

subscribe("trendData", updateSetOption);

onMounted(() => {
  initSetOption();
});
</script>

<style lang="scss" scoped>
.trend-line-container {
  height: 550px;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-top: 20px;

  .trend-line-chart {
    width: 100%;
    height: 92%;
  }
}
</style>
