import { __get, __post } from './request'

export const API__sayHello = () => __get('/')
export const API__login = (args: UserInfoLogin) => __post('/auth/login', args)
export const API__registry = (args: UserInfoLogin) => __post('/user/registry', args)
export const API_uploadImg = () => __post('/upload/img')