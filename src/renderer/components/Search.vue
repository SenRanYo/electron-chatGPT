<template>
  <div class="search">
    <a-input v-model="search" placeholder="搜索" allow-clear>
      <template #prefix>
        <icon-search />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from '@arco-design/web-vue/es/icon';
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits(["search"]);

const search = ref("");

watch(search, (val: string) => {
  emit("search", val)
});

</script>

<style scoped lang="less">
.search {
  padding: 8px;
}
</style>
