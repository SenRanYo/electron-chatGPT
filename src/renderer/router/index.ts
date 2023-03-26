import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router.esm-bundler"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/layout/index.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/index/index.vue")
        },
        {
          path: "chat/:id",
          component: () => import("../views/chat/index.vue")
        },
        {
          path: "setting",
          component: () => import("../views/setting/index.vue")
        }
      ]
    }
  ]
})
