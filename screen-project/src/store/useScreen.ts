import { defineStore } from "pinia";
import { computed, ref } from "vue";
import dark from "@/assets/img/switch_dark.png";
import light from "@/assets/img/switch_light.png";

export const useScreenStore = defineStore("screen", () => {
  // 主题名称
  // 【原】const theme = ref("dark"); 刷新会复位，改为首次从 localStorage 读取
  const theme = ref<"dark" | "light">(
    (localStorage.getItem("screen-theme") as "dark" | "light") || "dark",
  );

  // 主题图标
  const themeIcon = computed(() => (theme.value === "dark" ? light : dark));

  // 切换主题
  const changeTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    // 新增：持久化主题，刷新后保持
    localStorage.setItem("screen-theme", theme.value);
  };

  return {
    theme,
    themeIcon,
    changeTheme,
  };
});
