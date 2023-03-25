import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/renderer/App.vue"
import router from "@/renderer/router"
import "@arco-themes/vue-chat-gpt/index.less"

// Add API key defined in contextBridge to window object type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    mainApi?: any
  }
}

const app = createApp(App)

app.use(router).use(createPinia())

app.mount("#app")
