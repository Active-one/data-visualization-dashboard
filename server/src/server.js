const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

// 创建express应用
const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

const httpServer = createServer(app);
const port = 3000;

// 配置Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const merchants = ["商家1", "商家2", "商家3", "商家4", "商家5", "商家6"];

// 生成销售统计数据
function generateSalesData() {
  return merchants.map((name) => {
    return {
      name,
      value: Math.floor(Math.random() * 200) + 100,
    };
  });
}

const cities = ["北京", "上海", "广州", "深圳", "武汉"];

// 生成地区销量趋势数据（5 个城市 × 12 个月）
function generateTrendData() {
  return cities.map((name, index) => {
    return {
      id: `city-${index}`,
      name,
      value: Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 260) + 20,
      ),
    };
  });
}

io.on("connection", (socket) => {
  console.log("客户端已经连接：" + socket.id);

  // 销售统计数据
  socket.emit("salesData", generateSalesData());
  socket.emit("trendData", generateTrendData());
  const intervalOne = setInterval(() => {
    socket.emit("salesData", generateSalesData());
  }, 2000);
  const intervalTwo = setInterval(() => {
    socket.emit("trendData", generateTrendData());
  }, 5000);

  socket.on("disconnect", () => {
    console.log("客户端已经断开：" + socket.id);
    clearInterval(intervalOne);
    clearInterval(intervalTwo);
  });
});

app.get("*", (req, res, next) => {
  if (req.url.startsWith("/socket.io")) return next();
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

httpServer.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`);
});
