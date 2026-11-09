import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import router from "./router";
import chart from "./components/Chart";
import { createPinia } from "pinia";

import { setupProdMockServer } from "../mock/mockProdServer.ts";
// 生产环境注册 mock 数据
if (import.meta.env.PROD) {
  setupProdMockServer();
}

const pinia = createPinia();

const app = createApp(App);

app.use(chart);
app.use(router);
app.use(pinia);
app.mount("#app");
