<template>
  <div class="content-control">
    <a-space direction="vertical" fill>
      <a-radio-group v-model="type" type="button" size="medium" @change="handleOnTypeChange">
        <a-radio value="Chats">Chats</a-radio>
        <a-radio value="Prompts">Prompts</a-radio>
      </a-radio-group>
      <a-button v-if="type === 'Chats'" type="primary" long @click="handleClickNewChats">
        <template #icon>
          <icon-plus />
        </template>
        <template #default>New Chats</template>
      </a-button>
      <a-button v-if="type === 'Prompts'" type="primary" long @click="handleClickNewPrompts">
        <template #icon>
          <icon-plus />
        </template>
        <template #default>New Prompts</template>
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { db } from "../db"
import { nanoid } from "nanoid"
import { useRouter } from "vue-router"
import { ref, defineEmits } from "vue";
import { IconPlus } from '@arco-design/web-vue/es/icon';
const router = useRouter()
const emits = defineEmits(['change']);

const type = ref('Chats');
function handleOnTypeChange(value: string | number | boolean) {
  emits('change', value)
}
function handleClickNewChats() {
  const id = nanoid();
  db.chats.add({
    id,
    title: id,
    tokens: 0,
    createdAt: new Date(),
  });
  router.push({ path: '/chat/' + id })
}
function handleClickNewPrompts() {
  const id = nanoid();
  db.prompts.add({
    id,
    title: "New Prompts",
    content: "New Prompts",
    createdAt: new Date(),
  });
}
</script>

<style scoped lang="less">
.content-control {
  display: flex;
  padding: 8px;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s ease;

  .arco-radio-group-button {
    width: 100%;
    box-sizing: border-box;

    .arco-radio-button {
      flex: 1;
      text-align: center;
    }
  }


  .tab {
    text-transform: capitalize;
  }

  .new-button {
    width: 100%;
    margin-top: 8px;

    .btn-text {
      text-transform: capitalize;

    }
  }
}
</style>
