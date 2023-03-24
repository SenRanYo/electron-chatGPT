import { createRouter, createWebHashHistory } from "vue-router/dist/vue-router.esm-bundler"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/LayoutPage.vue")
    }
  ]
})
