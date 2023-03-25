<template>
  <div ref="inputRef" class="chat-input">
    <a-textarea v-model="content" class="textarea" placeholder="您的问题" auto-size @keydown.enter="handleEnter($event)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue"
import { useElementSize } from "@vueuse/core"
import { createChat } from "../openai"

const emits = defineEmits(['size'])

const content = ref("")
const inputRef = ref<HTMLDivElement>();
const { height } = useElementSize(inputRef);

watch(() => height.value, val => {
  emits('size', val)
}, { immediate: true })

async function handleEnter(event: any) {
  if (content.value) {
    if (!event.shiftKey) {
      event.preventDefault();

      console.log('Send');
      const result = await createChat('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', [
        {
          role: "system",
          content: 'You are ChatGPT, a large language model trained by OpenAI.',
        },
        {
          role: "user",
          content: '\n\n\n000\n\n',
        }
      ])
      console.log(result);

    }
  } else if (!event.shiftKey) {
    event.preventDefault();
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
