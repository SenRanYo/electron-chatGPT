import { ref } from "vue"
import { defineStore } from "pinia"
import { OpenAIApi, Model, Configuration } from "openai"
import { Notification } from "@arco-design/web-vue"

export const useOpenAIStore = defineStore("openai", function () {
  const key = ref<any>("")
  const model = ref<any>("")
  const models = ref<Model[]>([])
  const openai = ref<any>(null)

  async function init(config: { apiKey: string }) {
    if (!config.apiKey) return Promise.reject()
    const configuration = new Configuration(config)
    openai.value = new OpenAIApi(configuration)
    try {
      const result = await openai.value.listModels()
      key.value = config.apiKey
      models.value = result.data.data
    } catch (error: any) {
      const msg = error?.response?.data?.error?.message
      if (msg) Notification.error({ title: "错误", content: msg })
    }
  }

  return {
    init,
    key,
    openai,
    model,
    models
  }
})
