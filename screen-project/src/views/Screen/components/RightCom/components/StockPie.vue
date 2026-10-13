<template>
  <div class="stock-pie-container">
    <ChartTitle>库存和销量分析</ChartTitle>

    <!-- 图表 -->
    <div class="stock-pie-chart">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ChartTitle from "@/components/ChartTitle.vue";
import { useAsync } from "@/hooks/useAsync";
import { getStockList } from "@/api";
import type { StockType } from "@/types";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";

// 配置对象
const option = ref({});

useAsync(getStockList, {
  immediate: true,
  onSuccess(res) {
    if (res.code === 200) {
      setOption(res.data);
    }
  },
});

const getSeries = (data: StockType[]) => {
  const centerArr = [
    ["18%", "40%"],
    ["50%", "40%"],
    ["82%", "40%"],
    ["34%", "75%"],
    ["66%", "75%"],
  ];
  const colorArr = [
    ["#4FF778", "#0BA82C"],
    ["#E5DD45", "#E8B11C"],
    ["#E8821C", "#E55445"],
    ["#5052EE", "#AB6EE5"],
    ["#23E5E5", "#2E72BF"],
  ];

  const titleFontSize = (460 / 100) * 3.6;
  const innerRadius = titleFontSize * 2.8;
  const outerRadius = innerRadius * 1.125;

  return data.map((item, index) => {
    return {
      type: "pie",
      center: centerArr[index], // 圆的位置
      labelLine: {
        show: false, // 不显示提示文字连接线
      },
      emphasis: {
        scale: false, // 鼠标放上不缩放
      },
      // 对应下面两个对象的半径设置
      radius: [outerRadius, innerRadius],
      data: [
        {
          name: `${item.name}\n\n${item.sales}`,
          value: item.sales,
          label: {
            position: "center",
            fontSize: titleFontSize / 1.8,
            color: colorArr[index][0],
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: colorArr[index][0],
              },
              {
                offset: 1,
                color: colorArr[index][1],
              },
            ]),
          },
        },
        {
          value: item.stock,
          itemStyle: {
            color: "#333843",
          },
        },
      ],
    };
  });
};

const setOption = (data: StockType[]) => {
  option.value = {
    series: getSeries(data),
  };
};
</script>

<style lang="scss" scoped>
.stock-pie-container {
  height: 320px;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-bottom: 20px;

  .stock-pie-chart {
    width: 100%;
    height: 92%;
  }
}
</style>
