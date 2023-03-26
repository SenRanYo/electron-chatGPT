<template>
  <div class="toobar">
    <a-tooltip :content="isDark ? '浅色模式' : '暗黑模式'">
      <div class="toobar-item" @click="toggleDark()">
        <icon-sun-fill v-if="isDark" />
        <icon-moon-fill v-else />
      </div>
    </a-tooltip>
    <a-tooltip content="设置" @click="handleGoSetting()">
      <div class="toobar-item">
        <icon-settings />
      </div>
    </a-tooltip>
    <div class="toobar-item">
    </div>
    <div class="toobar-item">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useDark, useToggle } from "@vueuse/core"
import { IconMoonFill, IconSunFill, IconSettings } from '@arco-design/web-vue/es/icon';

const router = useRouter()

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

function handleGoSetting() {
  router.push({ path: '/setting' })
}
</script>

<style scoped lang="less">
.toobar {
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
