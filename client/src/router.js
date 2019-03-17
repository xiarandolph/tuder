import Vue from 'vue'
import Router from 'vue-router'
import Student from './views/Student.vue'
import Tutor from './views/Tutor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/student',
      name: 'student',
      component: Student
    },
    {
      path: '/tutor',
      name: 'tutor',
      component: Tutor
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Auth" */ './views/Auth.vue'),
    },
    {
      path:'/create_user',
      name: 'create_user',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateUser.vue'),
    }
  ]
})
