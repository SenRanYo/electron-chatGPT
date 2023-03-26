<template>
  <div ref="messageRef" class="chat-message">
    <a-scrollbar :style="styles">
      <div ref="scrollbarRef" class="message-list">
        <div v-for="(item) in messages" :key="item.id" class="message-item">
          <div class="message-avatar">
            <icon-user />
          </div>
          <div class="message-content">
            <p class="date-text">{{ item.content }}</p>
            <p class="date-text">{{ item.createdAt }}</p>
          </div>
          <div class="message-control">
            <div class="icon-button">
              <icon-copy />
            </div>
          </div>
        </div>
        <div v-if="props.wait" class="message-item">
          <a-skeleton class="skeleton" loading animation>
            <a-space direction="vertical" size="large" fill>
              <a-skeleton-line :rows="3" />
            </a-space>
          </a-skeleton>
        </div>
      </div>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { db, Message } from "../db";
import { liveQuery } from "dexie";
import { useElementSize } from "@vueuse/core"
import { ref, watch, computed, defineProps, nextTick } from "vue"
import { IconUser, IconCopy } from '@arco-design/web-vue/es/icon';


const props = defineProps({
  wait: { type: Boolean, default: false },
  chat: { type: Object, default: () => ({}) },
  offsetHeight: { type: Number, default: 0 },
});

const messages = ref<Message[]>([]);
const messageRef = ref<HTMLDivElement>();
const scrollbarRef = ref<HTMLDivElement>();
const { height } = useElementSize(messageRef);
const styles = computed(() => { return { height: height.value - props.offsetHeight + 'px', overflowY: 'auto' } })

watch(() => props.chat.id, id => {
  if (id) {
    liveQuery(() => db.messages.where('chatId').equals(id).sortBy('createdAt')).subscribe(async list => {
      messages.value = list;
      await nextTick();
      scrollbarRef.value?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    })
  }
}, { immediate: true })

watch(() => props.offsetHeight, async () => {
  await nextTick();
  scrollbarRef.value?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
})

watch(() => props.wait, async () => {
  await nextTick();
  scrollbarRef.value?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
})
</script>

<style scoped lang="less">
.chat-message {
  flex: 1;

  .message-list {
    gap: 8px;
    display: flex;
    flex-direction: column;
    padding: 16px 32px 0px 32px;

    .message-item {
      padding: 16px;
      display: flex;
      border-radius: 4px;
      border: 1px solid var(--color-border);
      background-color: var(--color-bg-2);

      .message-avatar {
        width: 32px;
        height: 32px;
        display: flex;
        font-size: 20px;
        align-items: center;
        border-radius: 4px;
        flex-shrink: 0;
        justify-content: center;
        color: var(--color-text-1);
        background-color: var(--color-neutral-4);
      }

      .message-content {
        flex: 1;
        display: flex;
        margin-left: 16px;
        margin-right: 16px;
        flex-direction: column;
        color: var(--color-neutral-8);
      }

      .message-control {
        display: flex;
        flex-shrink: 0;
        flex-direction: column;

        .icon-button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 18px;
          border-radius: 4px;
          justify-content: center;
          color: var(--color-neutral-4);

          &:hover {
            background-color: var(--color-neutral-2);
          }
        }
      }

      .skeleton {
        width: 100%;
      }
    }
  }
}
</style>
