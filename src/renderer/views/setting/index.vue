<template>
  <div class="setting">
    <Header title="设置"></Header>
    <div class="content">
      <a-space direction="vertical" size="medium" fill>
        <h4>OpenAI API Key</h4>
        <a-input-password v-model="key" class="key-input" placeholder="OpenAI API Key" allow-clear
          @blur="handleCheckKey" />
        <h4>OpenAI Model</h4>
        <a-select v-model="model" placeholder="OpenAI Model" allow-search :loading="selectLoading">
          <a-option v-for="(item) in openaiStore.models" :key="item.id">{{ item.id }}</a-option>
        </a-select>
        <a-button :disabled="!key" :loading="loading" type="primary" long @click="handleSaveSetting">保存</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/renderer/components/Header.vue";
import { db } from "@/renderer/db";
import { liveQuery } from "dexie";
import { ref } from "vue"
import { Notification } from "@arco-design/web-vue"
import { useOpenAIStore } from "@/renderer/store/openai"

const openaiStore = useOpenAIStore();

const loading = ref(false)
const selectLoading = ref(false)
const key = ref<string | undefined>("")
const model = ref<string | undefined>("")
liveQuery(() => db.settings.where({ id: "all" }).first()).subscribe(setting => {
  key.value = setting?.key
  model.value = setting?.model
  openaiStore.key = setting?.key
  openaiStore.model = setting?.model
})

async function handleCheckKey() {
  if (key.value) openaiStore.init({ apiKey: key.value })
}

function handleSaveSetting() {
  db.settings.where({ id: "all" }).modify((settings) => {
    settings.key = key.value;
    settings.model = model.value;

    Notification.info({ title: "成功", content: '保存成功' })
  })
}

</script>

<style scoped lang="less">
.setting {
  display: flex;
  flex-direction: column;
  color: var(--color-text-1);

  .content {
    padding: 32px;

    h4 {
      margin: 0;
    }

    .key-input {
      margin-right: 16px;
    }

  }
}
</style>
