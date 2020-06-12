import React from 'react'
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { RouterController } from './routeHoc'

const noFound = (contextPath: string) => ({
  path: `${contextPath}/*`,
  key: '*',
  component: () => <Redirect to='/404' />,
  meta: { title: '找不到该页面' }
})

// 路由渲染
function renderRouteConfig(routes: RouterConfigItem[], contextPath: string) {
  const children: JSX.Element[] = []

  const renderRoute = (route: RouterConfigItem, routeContextPath: string) => {
    let newContextPath = ''
    if (/^\//.test(route.path)) {
      newContextPath = route.path // 绝对路径不动
    } else {
      newContextPath = `${routeContextPath}/${route.path}` // 相对路径拼接上父级路径
    }
    newContextPath = newContextPath.replace(/\/+/g, '/') // 出现多个斜杠的情形替换成单斜杠
    if (route.component && route.children) {
      const childrenRoutes = renderRouteConfig(route.children, newContextPath)
      children.push(
        <Route
          key={route.key || route.path}
          exact={route.exact}
          render={props => (
            <RouterController route={route}>
              {
                route.render
                  ? (route.render({ ...props, route: route }))
                  : (
                    <route.component {...props} route={route} >
                      {childrenRoutes}
                      {route.redirect ? <Redirect to={route.redirect} /> : null}
                    </route.component>
                  )
              }
            </RouterController>
          )}
          path={newContextPath}
        />
      )
    } else if (route.component) {
      children.push(<Route
        key={route.key || route.path}
        exact={route.exact}
        render={props => (
          <RouterController route={route}>
            {
              route.render ? (
                route.render({ ...props, route: route })
              ) : <route.component {...props} route={route} />
            }
          </RouterController>)}
        path={newContextPath}
      />)
    } else if (route.children) {
      route.children.forEach(r => renderRoute(r, newContextPath))
    }
  }
  routes.concat(noFound(contextPath)).forEach(item => renderRoute(item, contextPath))
  return (
    <HashRouter>
      <Switch>
        {children}
      </Switch>
    </HashRouter>
  )
}

export default renderRouteConfig
