<template>
  <div class="chat-header">
    {{ props.chat.title }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  chat: { type: Object, default: () => ({}) },
});
</script>

<style scoped lang="less">
.chat-header {
  height: 60px;
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  color: var(--color-text-1);
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}
</style>
