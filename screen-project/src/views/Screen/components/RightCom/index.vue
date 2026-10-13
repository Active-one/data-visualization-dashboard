<template>
  <div class="right-com-container">
    <HotPie />
    <StockPie />
    <AreaBar />
  </div>
</template>

<script lang="ts" setup>
import HotPie from "@/views/Screen/components/RightCom/components/HotPie.vue";
import StockPie from "@/views/Screen/components/RightCom/components/StockPie.vue";
import AreaBar from "@/views/Screen/components/RightCom/components/AreaBar.vue";
</script>

<style scoped lang="scss">
.right-com-container {
  height: 100%;
}
</style>
