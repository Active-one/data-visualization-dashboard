<template>
  <div class="area-bar-container">
    <ChartTitle>地区销售排行</ChartTitle>

    <div class="area-bar-chart">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChartTitle from "@/components/ChartTitle.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useAsync } from "@/hooks/useAsync";
import { getAreaList } from "@/api";
import type { AreaType } from "@/types";
// 【原】全量引入（打包整个 ECharts，体积大）
// import * as echarts from "echarts";
import echarts from "@/utils/echarts";

const colorArr = [
  ["#0BA82C", "#4FF778"],
  ["#2E72BF", "#23E5E5"],
  ["#5052EE", "#AB6EE5"],
];
const barWidth = 20;

// 配置对象
const option = ref({});

const { execute } = useAsync(getAreaList, {
  onSuccess(res) {
    if (res.code === 200) {
      setOption(res.data);
    }
  },
  immediate: true,
});

const setOption = (data: AreaType[]) => {
  option.value = {
    tooltip: {
      max: (value: { max: number }) => value.max + 50,
    },
    dataZoom: {
      show: false,
      // 它俩定义初始显示的范围，这里设置的是所有
      startValue: 0,
      endValue: data.length - 1,
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
      axisLine: { show: true },
      axisLabel: {
        color: "#777",
      },
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.name),
      axisLabel: {
        color: "#777",
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    grid: {
      top: "15%",
      bottom: "0%",
      left: "5%",
      right: "5%",
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        data: data.map((item) => item.value),
        barWidth: barWidth,
        itemStyle: {
          borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
          color: (arg: any) => {
            // 目标颜色数组
            let targetColorArr: string[] | null = null;
            if (arg.value > 300) {
              targetColorArr = colorArr[0];
            } else if (arg.value > 200) {
              targetColorArr = colorArr[1];
            } else {
              targetColorArr = colorArr[2];
            }
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: targetColorArr[0],
              },
              {
                offset: 1,
                color: targetColorArr[1],
              },
            ]);
          },
        },
      },
    ],
  };
};

// 更新数据
const updateData = (duration: number = 5000) => {
  return setInterval(async () => {
    const res = await execute();
    if (res!.code === 200) {
      setOption(res!.data);
    }
  }, duration);
};

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = updateData();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.area-bar-container {
  height: 320px;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-bottom: 20px;

  .area-bar-chart {
    width: 100%;
    height: 92%;
  }
}
</style>
