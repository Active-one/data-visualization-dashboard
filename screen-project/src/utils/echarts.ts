// ECharts 按需引入（替代原来的全量引入）
// 只注册本项目实际用到的图表与组件，避免把整个 ECharts 打进包里
import * as echarts from "echarts/core";
import {
  BarChart,
  LineChart,
  PieChart,
  EffectScatterChart,
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  DataZoomComponent,
  AxisPointerComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
// 全量引入时自动带上的特性，按需模式下需手动注册，
// 否则 grid.containLabel 行为与原来不一致（ECharts 6 会提示）
import { LegacyGridContainLabel } from "echarts/features";

echarts.use([
  // 图表：柱状、折线、饼图、涟漪散点（地图）
  BarChart,
  LineChart,
  PieChart,
  EffectScatterChart,
  // 组件：直角坐标系、提示框、图例、地理坐标、缩放、坐标轴指示器
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  DataZoomComponent,
  AxisPointerComponent,
  // 特性：保持 containLabel 的原有行为
  LegacyGridContainLabel,
  // 渲染器
  CanvasRenderer,
]);

export default echarts;
