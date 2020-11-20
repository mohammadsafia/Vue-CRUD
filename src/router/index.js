import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import("@/components/Index")
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: () => import("@/components/AddSmoothie")
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: () => import("@/components/EditSmoothie")
    }
  ]
})
