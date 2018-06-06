import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'example' }
      }
    ]
  },

  {
    path: '/scenic',
    component: Layout,
    redirect: '/scenic/list',
    name: 'Scenic',
    meta: { title: '景区管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/scenic/index'),
        meta: { title: '景区列表', icon: 'table' }
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/scenic/account'),
        meta: { title: '景区账号', icon: 'tree' }
      }
    ]
  },
  {
    path: '/inn',
    component: Layout,
    redirect: '/inn/list',
    name: 'inn',
    meta: { title: '客栈管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/inn/index'),
        meta: { title: '客栈审核', icon: 'table' }
      },
      {
        path: 'exchange',
        name: 'exchange',
        component: () => import('@/views/inn/exchange'),
        meta: { title: '兑换管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Settings',
        component: () => import('@/views/settings/index'),
        meta: { title: '平台设置', icon: 'example' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

