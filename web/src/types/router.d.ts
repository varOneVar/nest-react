interface RouterConfigItem {
  path: string
  render?: React.ComponentElement
  component?: any
  exact?: boolean
  redirect?: string
  key?: string
  meta?: {
    title: string
    roles?: string[]
    [key: string]: any
  }
  children?: RouterConfigItem[]
}
