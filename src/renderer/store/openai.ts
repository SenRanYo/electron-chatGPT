import { ref } from "vue"
import { defineStore } from "pinia"
import { OpenAIApi, Model, Configuration } from "openai"
import { Notification } from "@arco-design/web-vue"

export const useOpenAIStore = defineStore("openai", function () {
  const key = ref<any>("")
  const model = ref<any>("")
  const models = ref<Model[]>([])
  const openai = ref<any>(null)

  function init(config: { apiKey: string }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (config.apiKey) {
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
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      }
    })
  }

  return {
    init,
    key,
    openai,
    model,
    models
  }
})
