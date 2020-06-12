import { RouteComponentProps } from 'react-router'
import { FormComponentProps } from 'antd/es/form'

declare global {
  type formWithRouterProps = FormComponentProps<UserInfoLogin> &
    RouteComponentProps

  interface UserInfoLogin {
    username: string
    pwd: string
    remember?: boolean
  }

  interface FormValue extends UserInfoLogin {
    remember: boolean
  }

  namespace User {
    interface userType {
      logger?: boolean
      _id?: string
      username: string
      pwd: string
      roles?: string[]
      createTime?: string
      __v?: number
    }
  }
}

export {}
