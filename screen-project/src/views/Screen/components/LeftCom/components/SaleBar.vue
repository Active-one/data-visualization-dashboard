<template>
  <div class="sale-bar-container">
    <ChartTitle>销售统计</ChartTitle>

    <!-- 图表 -->
    <div class="sale-bar-chart">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";
import ChartTitle from "@/components/ChartTitle.vue";
import type { SalesType } from "@/types";
import { useWebsocket } from "@/hooks/useWebsocket";

const option = ref({});
const { subscribe } = useWebsocket("http://localhost:3000");

// 初始化设置option
const initSetOption = () => {
  // 图表配置对象
  option.value = {
    yAxis: {
      type: "category",
      data: [],
      inverse: true,
      axisTick: { show: false },
      axisLabel: { color: "#fff" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        z: 0,
        lineStyle: {
          color: "#2d3443",
        },
      },
    },
    xAxis: {
      type: "value",
      splitLine: { show: false },
      axisLine: { show: true },
      axisLabel: { color: "#777" },
      // 最大数据的基础上+50，保证有空隙
      max: (value: { max: number }) => value.max + 50,
    },
    series: [
      {
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(220, 220, 220, .3)",
        },
        data: [],
        label: {
          show: true,
          position: "right",
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#00fffb",
            },
            {
              offset: 1,
              color: "#0061ce",
            },
          ]),
        },
        barWidth: 22,
        roundCap: true,
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      top: "3%",
      bottom: "5%",
      containLabel: true,
    },
  };
};

// 更新设置option
const updateSetOption = (data: SalesType[]) => {
  option.value = {
    yAxis: {
      data: data.map((item) => item.name),
    },
    series: [
      {
        data: data.map((item) => item.value),
      },
    ],
  };
};

subscribe("salesData", updateSetOption);

onMounted(() => {
  initSetOption();
});
</script>

<style lang="scss" scoped>
.sale-bar-container {
  height: 430px;
  background-color: var(--ds-block-bg);
  padding: 16px;

  .sale-bar-chart {
    width: 100%;
    height: 92%;
  }
}
</style>
