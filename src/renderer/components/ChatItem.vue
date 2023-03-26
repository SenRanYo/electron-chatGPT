<template>
  <div class="chat-item" :class="{ active: props.chat.id === chatId }" @click="handleClickChat">
    <div class="chat-icon">
      <icon-message size="20" />
    </div>
    <div class="chat-content">
      <span class="chat-title">{{ props.chat.title }}</span>
      <span class="chat-msg">{{ lastMessage.content }}</span>
    </div>
    <a-dropdown @select="handleOnSelect">
      <div class="chat-edit">
        <icon-more-vertical />
      </div>
      <template #content>
        <a-doption value="edit">编辑</a-doption>
        <a-doption value="delete">删除</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { db, Message } from "../db";
import { liveQuery } from "dexie";
import { ref, reactive, watch, defineProps } from "vue"
import { useRoute, useRouter } from "vue-router"
import { IconMessage, IconMoreVertical } from '@arco-design/web-vue/es/icon';

const props = defineProps({
  chat: { type: Object, default: () => ({}) },
});

const route = useRoute()
const router = useRouter()

const chatId = ref();
watch(() => route.params, (params) => {
  chatId.value = params.id || "";
}, { immediate: true })


const lastMessage = reactive<Message>({
  id: "",
  chatId: "",
  role: "user",
  content: "",
  createdAt: undefined
});
liveQuery(() => db.messages.where('chatId').equals(props.chat.id).sortBy('createdAt')).subscribe(list => {
  const msg = list.pop();
  if (msg) Object.assign(lastMessage, msg)
})

function handleClickChat() {
  router.push({ path: '/chat/' + props.chat.id })
}
async function handleOnSelect(value: string | number | Record<string, any> | undefined) {
  switch (value) {
    case 'edit':
      console.log('edit');
      break;
    case 'delete':
      await db.messages.where('chatId').equals(props.chat.id).delete()
      await db.chats.where('id').equals(props.chat.id).delete()
      router.push({ path: '/' })
      break;
  }

}
</script>

<style scoped lang="less">
.chat-item {
  width: 100%;
  height: 50px;
  padding: 8px;
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 1px;
  box-sizing: border-box;
  color: var(--color-text-1);

  &:hover,
  &.active {
    background-color: var(--color-neutral-2);
  }

  .chat-icon {
    padding: 8px;
    flex-shrink: 0;
    border-radius: 6px;
    color: rgb(var(--primary-6));
    background-color: rgb(var(--primary-1));
  }

  .chat-content {
    flex: 1;
    display: flex;
    margin-left: 16px;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-around;


    .chat-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chat-msg {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .chat-edit {
    padding: 8px;
    font-weight: bold;
    border-radius: 6px;

    &:hover {
      background-color: var(--color-neutral-3);
    }
  }
}
</style>
