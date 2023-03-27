<template>
  <div ref="inputRef" class="chat-input">
    <a-textarea v-model="content" class="textarea" placeholder="您的问题" auto-size @keydown.enter="handleEnter($event)" />
  </div>
</template>

<script setup lang="ts">
import { db, Message } from "../db";
import { nanoid } from "nanoid"
import { liveQuery } from "dexie";
import { useElementSize } from "@vueuse/core"
import { ref, watch, defineEmits, defineProps } from "vue"
import { useOpenAIStore } from "@/renderer/store/openai"
import { Notification } from "@arco-design/web-vue"

const emits = defineEmits(['size', 'wait'])

const props = defineProps({
  chat: { type: Object, default: () => ({}) },
});

const live = ref<any>(null)
const content = ref("")
const inputRef = ref<HTMLDivElement>();
const { height } = useElementSize(inputRef);

watch(() => height.value, val => {
  emits('size', val)
}, { immediate: true })

const messages = ref<Message[]>([])
watch(() => props.chat, (chat) => {
  if (live.value) live.value.unsubscribe()
  live.value = liveQuery(() => db.messages.where('chatId').equals(chat.id).sortBy('createdAt')).subscribe(list => {
    messages.value = list
  })
}, { deep: true })

const openaiStore = useOpenAIStore();
async function handleEnter(event: any) {
  const len = content.value.trim().length;
  if (!event.shiftKey) {
    event.preventDefault();
    if (len) {
      const systemMessage = { id: nanoid(), chatId: props.chat.id, role: "system", content: "You are ChatGPT, a large language model trained by OpenAI.", createdAt: new Date() }
      await db.messages.add({ id: nanoid(), chatId: props.chat.id, role: "user", content: content.value, createdAt: new Date() });
      if (messages.value.length === 0) await handleChangeChatTitle(content.value)
      const list = await db.messages.where('chatId').equals(props.chat.id).sortBy('createdAt');
      content.value = "";
      try {
        emits('wait', true);
        const result = await openaiStore.openai.createChatCompletion({
          model: openaiStore.model,
          stream: false,
          messages: [systemMessage, ...list].map(item => { return { role: item.role, content: item.content } })
        })
        await db.messages.add({ id: nanoid(), chatId: props.chat.id, role: result?.data?.choices[0]?.message?.role, content: result?.data?.choices[0]?.message?.content, createdAt: new Date() });
        emits('wait', false);
      } catch (error: any) {
        emits('wait', false);
        const msg = error?.response?.data?.error?.message
        if (msg) Notification.error({ title: "错误", content: msg })
      }
    }
  }

  async function handleChangeChatTitle(title: string) {
    await db.chats.where('id').equals(props.chat.id).modify((chat) => {
      chat.title = title
    })
  }

}

</script>

<style scoped lang="less">
.chat-input {
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-shrink: 0;
  position: absolute;

  .textarea {
    margin: 16px 32px;
    max-height: 150px;
    overflow-y: auto;
  }
}
</style>
