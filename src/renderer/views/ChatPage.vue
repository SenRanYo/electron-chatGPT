<template>
  <ChatHeader :chat="chat"></ChatHeader>
  <ChatMessages :chat="chat" :offset-height="offsetHeight"></ChatMessages>
  <ChatInput :chat="chat" @size="handleOnSize"></ChatInput>
</template>

<script setup lang="ts">
import { db, Chat } from "../db";
// import { nanoid } from "nanoid"
import { ref, watch, reactive, } from "vue"
import { useRoute } from "vue-router"

import ChatInput from "@renderer/components/ChatInput.vue";
import ChatHeader from "@renderer/components/ChatHeader.vue";
import ChatMessages from "@renderer/components/ChatMessages.vue";

const route = useRoute()


const chat = reactive<Chat>({
  id: "",
  title: "",
  tokens: 0,
  createdAt: undefined
});
const chatId = ref()
watch(() => route.params, async params => {
  if (params.id) {
    chatId.value = params.id;
    const findChat = await db.chats.where('id').equals(chatId.value).first()
    Object.assign(chat, findChat)
  }
}, { immediate: true })

const offsetHeight = ref(0)
function handleOnSize(height: number) {
  offsetHeight.value = height
}

// function handleTestMessage() {
//   const id = nanoid();
//   db.messages.add({
//     id,
//     chatId: chatId.value,
//     role: "user",
//     content: new Date().toDateString(),
//     createdAt: new Date()
//   });
// }
</script>

