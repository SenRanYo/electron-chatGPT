<template>
  <div class="app-logo">
    <span class="logo-text" @click="handleClick">
      ChatGPT AI
    </span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

function handleClick() {
  router.push({
    path: '/',
  })
}
</script>

<style scoped lang="scss">
.app-logo {
  height: 60px;
  color: #33cb8a;
  text-align: center;
  line-height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

  .logo-text {
    padding: 15px;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>
