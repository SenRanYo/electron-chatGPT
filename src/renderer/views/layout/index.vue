<template>
  <div class="app-main">
    <div class="app-sider">
      <Logo></Logo>
      <Control @change="handleOnChange"></Control>
      <Search @search="handleOnSearch"></Search>
      <Chats v-if="type === 'Chats'" :search="search"></Chats>
      <Prompts v-if="type === 'Prompts'"></Prompts>
      <Toolbar></Toolbar>
    </div>
    <div class="app-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@renderer/components/Logo.vue";
import Control from "@renderer/components/Control.vue";
import Search from "@renderer/components/Search.vue";
import Chats from "@renderer/components/Chats.vue";
import Prompts from "@renderer/components/Prompts.vue";
import Toolbar from "@renderer/components/Toolbar.vue";
import { ref } from "vue";
import { db } from "@/renderer/db";
import { liveQuery } from "dexie";
import { useOpenAIStore } from "@/renderer/store/openai"

const openaiStore = useOpenAIStore();
liveQuery(() => db.settings.where({ id: "all" }).first()).subscribe(setting => {
  if (setting?.key) openaiStore.init({ apiKey: setting.key })
  openaiStore.model = setting?.model
})

const type = ref("Chats");
const search = ref("");

function handleOnChange(value: string) {
  type.value = value;
}

function handleOnSearch(value: string) {
  search.value = value;
}
</script>

<style scoped lang="less">
.app-main {
  width: 100%;
  height: 100%;
  display: flex;

  .app-sider {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    background-color: var(--color-bg-2);
    border-right: 1px solid var(--color-border);
  }

  .app-content {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    transition: all 0.3s ease;
    background-color: var(--color-neutral-1);
  }
}
</style>
