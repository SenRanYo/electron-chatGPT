import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router.esm-bundler"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/LayoutPage.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/IndexPage.vue")
        },
        {
          path: "chat/:id",
          component: () => import("../views/ChatPage.vue")
        }
      ]
    }
  ]
})
