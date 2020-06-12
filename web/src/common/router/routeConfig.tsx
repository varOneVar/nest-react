import React from 'react'
import { Redirect } from 'react-router-dom'
import NotFound from '../../features/common/Error/404'
import commonRoutes from '../../features/common/route'
import workbenchRoutes from '../../features/router'

const routesInitialConfig = [
  ...commonRoutes,
  ...workbenchRoutes,
  {
    path: '/',
    exact: true,
    key: '/',
    component: () => <Redirect to="/home" />,
    meta: { title: '首页' }
  },
  {
    path: '*',
    key: 'NotFound',
    component: NotFound,
    meta: { title: '找不到该页面' }
  }
]
export default routesInitialConfig
