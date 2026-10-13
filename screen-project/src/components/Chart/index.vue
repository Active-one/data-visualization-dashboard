<template>
  <!-- 图表容器 -->
  <div ref="chartRef" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
// 【原】内联 type 写法会被打包器保留成对完整 echarts 的运行时引用，导致按需失效
// import { type ECharts } from "echarts";
import type { ECharts } from "echarts";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";

const props = defineProps({
  // 图表配置对象
  option: {
    type: Object,
    default: () => ({}),
  },
});

// 图表容器的ref引用
const chartRef = ref<HTMLElement | null>(null);
const myChart = ref<ECharts | null>(null);

const initChart = () => {
  myChart.value = echarts.init(chartRef.value);
  setOption(props.option);
};

// 显示图表
const setOption = (
  option: Record<string, any>,
  notMerge?: boolean,
  lazyUpdate?: boolean,
) => {
  if (myChart.value) {
    myChart.value.setOption(option, notMerge, lazyUpdate);
  }
};

onMounted(() => {
  // 初始化echarts实例
  initChart();
});

watch(
  () => props.option,
  () => {
    setOption(props.option);
  },
);
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
