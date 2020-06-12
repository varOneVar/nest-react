import React, { Suspense } from 'react';
import { Redirect } from "react-router-dom";
import { hasPermission } from '../utils/permission'
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd';
import StorageJs from '../utils/storage'
const storage = new StorageJs('login_')

export function SuspenseComponent<T>(Component: any) {
  return function (props: T) {
    return (
      <Suspense fallback={<Spin size="large" />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

// 权限与未登录
const whiteList = ['registry', 'login']

export function RouterController(props: any) {
  const userInfo: User.userType = storage.session.get('userinfo')
  const roles = userInfo && (userInfo.roles || [])
  console.log(props)
  const noLogin = noLoginController(userInfo)
  if (noLogin) return noLogin
  const auth = authorialController(props.route, roles)
  if (auth) return auth
  return (
    <>
      {/* <RedirectRouteController path={props.route.path} redirectPath={props.route.redirect} /> */}
      {props.children}
    </>
  )
}
interface RedirectRouteType {
  path: string;
  redirectPath: string | undefined;
}

export function RedirectRouteController(props: RedirectRouteType) {
  const location = useLocation()
  console.log(location.pathname, props, 'RedirectRouteController')
  if (props.path !== location.pathname && props.redirectPath && props.redirectPath !== location.pathname) {
    console.log(1, props)
    return <Redirect to="/404" />
  }
  if (props.redirectPath) {
    console.log(2)
    return <Redirect to={props.redirectPath} />
  }
  console.log(3)
  return null
}

function noLoginController(userInfo: User.userType | null) {
  if (!(userInfo && userInfo.logger) && !whiteList.some(w => ~window.location.href.indexOf(w))) {
    return <Redirect to="/login" />
  }
  return null
}

function authorialController(route: RouterConfigItem, roles: string[]) {
  return !hasPermission(roles, route)
    ? <Redirect to="/forbidden" />
    : null
}