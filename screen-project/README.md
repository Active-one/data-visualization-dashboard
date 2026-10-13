# SmartScreen · 前端

Vue3 + TypeScript + ECharts 前端。项目完整说明见仓库根目录 [README](../README.md)。

## 开发

```bash
npm install
npm run dev      # 开发服务，默认 http://localhost:5173
npm run build    # 类型检查 + 构建
npm run preview  # 预览构建产物
```

## 说明

- ECharts 按需注册在 `src/utils/echarts.ts`，新增图表类型需在此处注册
- 等比自适应、Socket.IO 长连接分别封装在 `src/hooks/` 下
- 实时数据后端位于 `../server`
