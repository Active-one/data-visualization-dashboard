<template>
  <div class="screen-container">
    <div
      class="screen-wrapper"
      :class="{ light: screenStore.theme === 'light' }"
      ref="screenRef"
    >
      <!-- 头部区域 -->
      <div class="screen-header">
        <Header />
      </div>

      <!-- 主内容区域 -->
      <div class="screen-main">
        <div class="screen-left">
          <LeftCom />
        </div>
        <div class="screen-center">
          <CenterCom />
        </div>
        <div class="screen-right">
          <RightCom />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useResize } from "@/hooks/useResize";
import Header from "@/views/Screen/components/Header/index.vue";
import LeftCom from "@/views/Screen/components/LeftCom/index.vue";
import RightCom from "@/views/Screen/components/RightCom/index.vue";
import CenterCom from "@/views/Screen/components/CenterCom/index.vue";
import { useScreenStore } from "@/store/useScreen";

const screenStore = useScreenStore();
const { screenRef } = useResize();
</script>

<style scoped lang="scss">
.screen-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;

  --ds-screen-width: 1920px;
  --ds-screen-height: 1080px;
  --ds-header-height: 72px;
  --ds-block-bg: #222733;
  --ds-screen-bg: rgb(22, 21, 24);
  --ds-screen-text-color: #fff;

  .screen-wrapper {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    left: 0;
    top: 0;
    transition: 0.3s ease-in-out;
    transform-origin: top left;
    padding: 0 20px;
    background-color: var(--ds-screen-bg);
    color: var(--ds-screen-text-color);

    .screen-main {
      position: relative;
      display: flex;
      height: calc(100% - var(--ds-header-height));

      .screen-center {
        flex: 1;
        width: calc(var(--ds-screen-width) - 1000px);
        height: 100%;
      }
      .screen-left,
      .screen-right {
        width: 460px;
        height: 100%;
      }
    }

    // 亮色主题的类名
    &.light {
      --ds-screen-bg: rgb(238, 238, 238);
      --ds-screen-text-color: rgb(22, 21, 34);
      --ds-block-bg: #fff;
    }
  }
}
</style>
