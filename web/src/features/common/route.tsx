import { SuspenseComponent } from '../../common/router/routeHoc'
import { lazy } from 'react'

const Login = lazy(() => import('./Login/login'))
const NotAuth = lazy(() => import('./NotAuth'))
const Err500 = lazy(() => import('./Error/500'))
const Registry = lazy(() => import('./Login/registry'))

const commonRoutes = [
  {
    path: '/login',
    key: 'login',
    component: SuspenseComponent(Login),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/forbidden',
    key: 'forbidden',
    component: SuspenseComponent(NotAuth),
    meta: {
      title: '暂无权限'
    }
  },
  {
    path: '/err500',
    key: 'err500',
    component: SuspenseComponent(Err500),
    meta: {
      title: '服务器错误',
      roles: ['admin']
    }
  },
  {
    path: '/registry',
    key: 'registry',
    component: SuspenseComponent(Registry),
    meta: {
      title: '注册'
    }
  },
]
export default commonRoutes
