import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/screen",
    },
    {
      path: "/screen",
      name: "screen",
      component: () => import("@/views/Screen/index.vue"),
    },
  ],
});

export default router;
