import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router.esm-bundler"
import Layout from "../views/layout/index.vue"
import Index from "../views/index/index.vue"
import Chat from "../views/chat/index.vue"
import Setting from "../views/setting/index.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Index
        },
        {
          path: "chat/:id",
          component: Chat
        },
        {
          path: "setting",
          component: Setting
        }
      ]
    }
  ]
})
