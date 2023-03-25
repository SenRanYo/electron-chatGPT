<template>
  <div ref="chatsRef" class="chats">
    <a-scrollbar :style="chatsStyle">
      <ChatItem v-for="(chat) in filterChats" :key="chat.id" :chat="chat">
      </ChatItem>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { db } from "../db";
import { liveQuery } from "dexie";
import { ref, watch, defineProps, computed } from "vue"
import { useRoute } from "vue-router"
import { useElementSize } from "@vueuse/core"

import ChatItem from "./ChatItem.vue"

const route = useRoute()
const props = defineProps({
  search: {
    type: [String, Number],
    default: ""
  },
});

const chatsRef = ref<HTMLDivElement>();
const { height } = useElementSize(chatsRef);
const chatsStyle = computed(() => { return { height: height.value + 'px', overflowY: 'auto' } })

const chatId = ref();
watch(() => route.params, (params) => {
  chatId.value = params.id || "";
}, { immediate: true })

const chats = ref<any[]>([]);
liveQuery(() => db.chats.orderBy("createdAt").reverse().toArray()).subscribe(list => {
  chats.value = list;
})

const filterChats = computed(() => {
  if (!props.search) return chats.value;
  return chats.value.filter(item => item.title.indexOf(props.search) >= 0)
})

</script>
<style scoped lang="less">
.chats {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
</style>
