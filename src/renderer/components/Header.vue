<template>
  <div class="header">
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  title: { type: String, default: "" },
});
</script>

<style scoped lang="less">
.header {
  height: 60px;
  display: flex;
  flex-shrink: 0;
  padding: 0 16px;
  box-sizing: border-box;
  color: var(--color-text-1);
  align-items: center;
  transition: all 0.3s ease;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}
</style>
