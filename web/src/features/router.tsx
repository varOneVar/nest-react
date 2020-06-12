import LayOut from '../components/layout'
import { SuspenseComponent } from '../common/router/routeHoc'
import { lazy } from 'react'
// import { Redirect } from 'react-router-dom'
// import React from 'react'


const Recommend = lazy(() => import('./workbench/Recommend'))
const Collect = lazy(() => import('./workbench/Collect'))
const Dynamic = lazy(() => import('./workbench/Dynamic'))
const Mine = lazy(() => import('./workbench/Mine'))

const workbenchRoutes = [
  {
    path: '/home',
    key: 'home',
    component: LayOut,
    redirect: '/home/recommend',
    children: [
      // 嵌套路由，父级路由不能使用exact属性，不然子路由无效
      {
        path: '/home', // 先匹配渲染父级的组件，然后渲染子级，虽然路径一样，组件不同不会冲突，奇怪的路由
        key: 'recommends',
        exact: true,
        component: SuspenseComponent(Recommend),
        meta: {
          title: '推荐'
        }
      },
      {
        path: '/home/recommend',
        key: 'recommend',
        component: SuspenseComponent(Recommend),
        meta: {
          title: '推荐'
        }
      },
      {
        path: '/home/collect',
        key: 'collect',
        component: SuspenseComponent(Collect),
        meta: {
          title: '馆藏'
        }
      },
      {
        path: '/home/dynamic',
        key: 'dynamic',
        component: SuspenseComponent(Dynamic),
        meta: {
          title: '动态'
        }
      },
      {
        path: '/home/mine',
        key: 'mine',
        component: SuspenseComponent(Mine),
        meta: {
          title: '我的'
        }
      },
      // {
      //   path: '/home/*',
      //   key: 'NotFound',
      //   component: () => <Redirect to='/404' />,
      //   meta: { title: '找不到该页面' }
      // }
    ]
  }
]
export default workbenchRoutes
