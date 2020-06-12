/**
 * 返回路由是否通过验证
 * @param roles 权限角色数组
 * @param route 验证路由对象
 */
export function hasPermission(roles: string[], route: RouterConfigItem) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.roles?.includes(role))
  }
  return true;
}

/**
 * 获取通过权限验证的可访问路由
 * @param roles 权限角色数组
 * @param routes 初始路由配置
 */
export function filterPassRouter(roles: string[], routes: RouterConfigItem[]) {
  const res:RouterConfigItem[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterPassRouter(roles, tmp.children)
      }
      res.push(tmp)
    }
  })
  return res
}
