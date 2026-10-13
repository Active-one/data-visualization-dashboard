# SmartScreen · 销售数据可视化大屏

基于 **Vue3 + TypeScript + ECharts** 的数据可视化大屏，集中展示销售、库存、地区分布等业务指标。销售数据经 Socket.IO 实时推送，支持 1920×1080 设计稿等比自适应与明暗主题切换。

---

## 功能模块

| 区域 | 内容 |
| --- | --- |
| 头部 | 标题、当前时间、主题切换 |
| 左侧 | 商家销售统计（柱状图）、地区销量趋势（折线图） |
| 中央 | 全国地图商家分布（地图 + 涟漪散点） |
| 右侧 | 地区销售排行（柱状图）、热销商品占比（饼图）、库存占比（饼图） |

- 6 类可视化图表，全部封装为可复用组件
- Socket.IO 实时推送，销售数据自动刷新
- 明暗主题切换，刷新后状态保持
- 任意分辨率下等比缩放不变形

---

## 技术栈

- **框架**：Vue3（Composition API）、Vue Router、Pinia
- **可视化**：ECharts 6（按需引入）
- **语言 / 样式**：TypeScript、SCSS
- **通信**：Socket.IO、Axios
- **工程化**：Vite、Mock.js

---

## 技术亮点

### 1. ECharts 按需引入：主包体积 1213 KB → 740 KB

按需引入做对了两件事才真正生效：

**第一，只注册用到的模块**（`src/utils/echarts.ts`）。ECharts 6 下还需要显式注册 `LegacyGridContainLabel` 特性，否则 `grid.containLabel` 的行为与全量引入时不一致。

**第二，也是最容易踩的坑**——类型导入的写法。容器组件里原本写的是内联 `type` 修饰符：

```ts
// 错误：在 verbatimModuleSyntax 下，这行不会被完全擦除
import { type ECharts } from "echarts";
```

开启 `verbatimModuleSyntax` 后，这种写法会被保留成一个**空的副作用导入**（`import {} from "echarts"`）。打包器无法 tree-shake 掉它，于是整个 ECharts 又被拉了回来——按需引入形同虚设。

改成顶层 `import type` 写法后被完全擦除，按需引入才真正生效：

```ts
// 正确：编译后整行消失
import type { ECharts } from "echarts";
```

结果：主包体积由 **1213 KB 降至 740 KB**（gzip 后减少约 37%）。

### 2. 图表组件封装

`src/components/Chart/index.vue` 封装了 ECharts 的初始化、`setOption` 与 option 变更监听，并通过 `src/components/Chart/index.ts` 注册为全局组件 `v-chart`。业务侧只需传入 option：

```vue
<v-chart :option="saleBarOption" />
```

### 3. 等比自适应（`useResize`）

以 1920×1080 为设计基准，根据窗口尺寸计算 `scale = Math.min(clientWidth / 1920, clientHeight / 1080)`，再用 `transform: scale()` 缩放整个大屏容器并计算居中偏移。窗口 resize 事件做了防抖（默认 150ms），避免高频重排。也支持 `isFullScreen` 模式（宽高分别缩放以填满屏幕）。

### 4. Socket.IO 长连接封装（`useWebsocket`）

封装为组合式函数，统一处理连接生命周期与事件分发：

- 用 **`shallowRef`** 持有 Socket 实例，而非 `ref` —— `ref` 会对其进行深层响应式代理，既无必要，也可能干扰 Socket 内部状态
- 通过 `onAny` 统一入口 + `Map` 存储的事件表做事件分发，业务侧只 `subscribe(eventName, callback)`
- 内置断线重连配置，组件卸载时自动断开并清空事件表，避免重复订阅与内存泄漏

### 5. 主题切换

明暗主题由 CSS 变量驱动，切换时**无需重建图表实例**；主题状态写入 `localStorage`，刷新后保持。

### 6. Axios 二次封装

以类（`class Request`）封装实例，统一请求/响应拦截器，并用泛型约束业务返回类型：

```ts
get<T>(url: string, params?: object): Promise<ResBodyType<T>>
```

---

## 目录结构

```
screen-project/                    前端
├── mock/index.ts                  Mock 接口
├── src/
│   ├── api/index.ts               接口定义
│   ├── components/
│   │   ├── Chart/                 ECharts 通用组件（全局注册 v-chart）
│   │   └── ChartTitle.vue
│   ├── hooks/
│   │   ├── useResize.ts           等比自适应
│   │   ├── useWebsocket.ts        Socket.IO 封装
│   │   └── useAsync.ts            异步状态封装
│   ├── store/useScreen.ts         主题状态
│   ├── utils/
│   │   ├── echarts.ts             ECharts 按需注册
│   │   └── request.ts             Axios 封装
│   └── views/Screen/
│       └── components/            Header / LeftCom / CenterCom / RightCom
└── ...

server/                            后端
└── src/server.js                  Express + Socket.IO，每 2s 推送一次销售数据
```

---

## 本地运行

**后端**（默认 `http://localhost:3000`）

```bash
cd server
npm install
npm start
```

**前端**（默认 `http://localhost:5173`）

```bash
cd screen-project
npm install
npm run dev
```

Mock 接口由 `vite-plugin-mock` 提供，配置见 `vite.config.ts`。

> 后端为演示实现，销售数据由服务端随机生成并定时推送，不依赖数据库。
