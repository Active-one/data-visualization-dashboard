<template>
  <div class="hot-pie-container">
    <ChartTitle>热销商品的占比</ChartTitle>

    <!-- 图表 -->
    <div class="hot-pie-chart">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ChartTitle from "@/components/ChartTitle.vue";
import { useAsync } from "@/hooks/useAsync";
import { getHotList } from "@/api";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";
import type { HotCategoryType, HotChildCategoryType } from "@/types";

// 配置对象
const option = ref({});

useAsync(getHotList, {
  immediate: true,
  onSuccess(res) {
    if (res.code === 200) {
      setOption(res.data);
    }
  },
});

const setOption = (data: HotCategoryType[]) => {
  option.value = {
    tooltip: {
      trigger: "item",
      formatter(params: any) {
        const children = params.data.children;
        let total = 0;
        children.forEach((item: HotChildCategoryType) => {
          total += item.value;
        });
        let str = "";
        children.forEach((item: HotChildCategoryType) => {
          str += `${item.name}:${Math.floor((item.value / total) * 100)}%<br/>`;
        });
        return echarts.format.encodeHTML(str);
      },
    },
    grid: {
      containLabel: false,
    },
    legend: {
      bottom: "0%",
      textStyle: {
        color: "#aaa",
      },
      icon: "circle",
      data: data[0].children.map((item) => item.name),
    },
    series: {
      type: "pie",
      radius: "70%",
      data: data[0].children!.map((item) => ({
        name: item.name,
        value: item.value,
        children: item.children,
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, .3)",
        },
      },
      label: {
        color: "#bbb",
        fontSize: 14,
      },
    },
  };
};
</script>

<style lang="scss" scoped>
.hot-pie-container {
  height: 320px;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-bottom: 20px;

  .hot-pie-chart {
    width: 100%;
    height: 92%;
  }
}
</style>
