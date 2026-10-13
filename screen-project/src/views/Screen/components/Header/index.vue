<template>
  <div class="header-container">
    <div class="header-content">
      <div class="left-logo">
        <h1>screen</h1>
      </div>
      <div class="center-title">
        <h3>大屏数据可视化</h3>
      </div>
      <div class="right-info">
        <img
          class="icon"
          :src="screenStore.themeIcon"
          @click="screenStore.changeTheme"
        />
        <span class="date">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { onMounted, onUnmounted, ref } from "vue";
import { useScreenStore } from "@/store/useScreen";

const screenStore = useScreenStore();
// 默认为暗色主题，显示亮色图标
const date = ref("");
const timer = ref();

// 开始更新日期
const start = () => {
  timer.value = setInterval(() => {
    date.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
};
// 停止更新
const end = () => {
  clearInterval(timer.value);
  timer.value = null;
};

onMounted(() => {
  start();
});

onUnmounted(() => {
  end();
});
</script>

<style scoped lang="scss">
.header-container {
  height: var(--ds-header-height);
  background: url("@/assets/img/header.png") no-repeat center / 100%;
  .header-content {
    height: calc(100% - 20px);
    line-height: 50px;
    text-align: center;
    position: relative;
    .left-logo {
      position: absolute;
      left: 0;
      top: 0;
    }
    .center-title {
      display: flex;
      justify-content: center;
      padding-top: 13px;
      h3 {
        font-weight: normal;
        font-size: 30px;
      }
    }
    .right-info {
      position: absolute;
      right: 10px;
      top: 3px;
      display: flex;
      align-items: center;
      .icon {
        width: 30px;
        margin-right: 15px;
        transition: 0.3s;
        transform-origin: center center;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
