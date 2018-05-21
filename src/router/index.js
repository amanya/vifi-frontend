import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Vineyard from '@/components/Vineyard'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) {
          next('/vineyard')
        } else {
          next()
        }
      }
    },
    {
      path: '/vineyard',
      name: 'Vineyard',
      component: Vineyard,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
