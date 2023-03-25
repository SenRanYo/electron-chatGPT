<template>
  <div ref="chats" class="prompts">
    <a-scrollbar :style="chatsStyle">
      <div class="chat-item" v-for="(item, index) in list" :key="index">
        <div class="chat-icon">
          <icon-message size="20" />
        </div>
        <div class="chat-content">
          <span class="chat-title">New Prompts</span>
          <span class="chat-msg">New Prompts</span>
        </div>
        <a-dropdown>
          <div class="chat-edit">
            <icon-more-vertical />
          </div>
          <template #content>
            <a-doption>编辑</a-doption>
            <a-doption>删除</a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue"
import { useElementSize } from "@vueuse/core"
import { IconMessage, IconMoreVertical } from '@arco-design/web-vue/es/icon';


const props = defineProps({
  search: {
    type: [String, Number],
    default: ""
  },
});
const chats = ref<HTMLDivElement>();
const { height } = useElementSize(chats);
const chatsStyle = computed(() => { return { height: height.value + 'px', overflowY: 'auto' } })

const list = ref<object[]>([]);

for (let index = 0; index < 20; index++) {
  list.value.push({})
}

</script>

<style scoped lang="less">
.prompts {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  .chat-item {
    width: 100%;
    height: 50px;
    padding: 8px;
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-bottom: 2px;
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


      .chat-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .chat-msg {
        margin-top: 8px;
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
}
</style>
