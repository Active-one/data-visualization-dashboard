<template>
  <div class="chart-title-container">
    <h3 class="chart-title">
      <slot></slot>
    </h3>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.chart-title-container {
  .chart-title {
    color: var(--ds-screen-text-color);
    padding-left: 20px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 3px;
      top: 0.5px;
      left: 0;
      height: 100%;
      background-color: var(--ds-screen-text-color);
      border-radius: 3px;
    }
  }
}
</style>
