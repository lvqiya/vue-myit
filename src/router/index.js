import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/roles/rights.vue'
import Roles from '@/components/roles/roles.vue'
import Goods from '@/components/goods/goodslist.vue'
import Goodsadd from '@/components/goods/goodsadd.vue'

import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [{
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        name: 'users',
        path: '/users',
        component: Users
      },{
        name: 'rights',
        path: '/rights',
        component: Rights
      },{
        name: 'roles',
        path: '/roles',
        component: Roles
      },{
        name: 'goods',
        path: '/goods',
        component: Goods
      },{
        name: 'goodsadd',
        path: '/goodsadd',
        component: Goodsadd
      }]
    },
    
  ]
})
router.beforeEach((to,from,next)=>{
  if (to.name == 'login') {
    next()
  }else{
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({ 'name': 'login' })
      Message.warning('请先登录')
      return
    }
    next()
  }
})
export default router