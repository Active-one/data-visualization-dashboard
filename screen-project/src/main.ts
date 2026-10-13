import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import router from "./router";
import chart from "./components/Chart";
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);

app.use(chart);
app.use(router);
app.use(pinia);
app.mount("#app");
