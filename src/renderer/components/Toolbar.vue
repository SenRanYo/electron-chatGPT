<template>
  <div class="toobar">
    <a-tooltip :content="isDark ? '浅色模式' : '暗黑模式'">
      <div class="toobar-item" @click="switchTheme()">
        <icon-sun-fill v-if="isDark" />
        <icon-moon-fill v-else />
      </div>
    </a-tooltip>
    <a-tooltip content="设置" @click="handleGoSetting()">
      <div class="toobar-item">
        <icon-settings />
      </div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from "vue-router"
import { useAppStore } from "@/renderer/store/app"
import { useDark, useToggle } from "@vueuse/core"
import { IconMoonFill, IconSunFill, IconSettings } from '@arco-design/web-vue/es/icon';


const isDark = useDark({ selector: 'body', attribute: 'arco-theme', valueDark: 'dark', valueLight: 'light', })
const switchTheme = useToggle(isDark)

const appStore = useAppStore()
watch(isDark, (val) => { appStore.isDark = val })

const router = useRouter()
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
