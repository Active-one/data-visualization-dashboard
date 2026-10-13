<template>
  <div class="left-com-container">
    <SaleBar />
    <TrendLine />
  </div>
</template>

<script lang="ts" setup>
import SaleBar from "@/views/Screen/components/LeftCom/components/SaleBar.vue";
import TrendLine from "@/views/Screen/components/LeftCom/components/TrendLine.vue";
</script>

<style scoped lang="scss">
.left-com-container {
  height: 100%;
}
</style>
