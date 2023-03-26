import { ref } from "vue"
import { defineStore } from "pinia"

export const useAppStore = defineStore("app", function () {
  const isDark = ref<boolean>(false)

  return {
    isDark
  }
})
