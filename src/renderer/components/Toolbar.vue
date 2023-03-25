<template>
  <div class="footer-toobar">
    <a-tooltip :content="isDark ? '浅色模式' : '暗黑模式'">
      <div class="toobar-item" @click="toggleDark()">
        <icon-sun-fill v-if="isDark" />
        <icon-moon-fill v-else />
      </div>
    </a-tooltip>
    <div class="toobar-item">
    </div>
    <div class="toobar-item">
    </div>
    <div class="toobar-item">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core"
import { IconMoonFill, IconSunFill } from '@arco-design/web-vue/es/icon';

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<style scoped lang="less">
.footer-toobar {
  display: flex;
  padding: 8px;
  margin-top: auto;
  color: var(--color-text-1);
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  transition: all 0.3s ease;

  .toobar-item {
    width: 40px;
    height: 40px;
    display: flex;
    cursor: pointer;
    align-items: center;
    border-radius: 8px;
    justify-content: center;

    &:hover {
      background-color: var(--color-neutral-2);
    }
  }
}
</style>
