import axios, { AxiosRequestConfig } from 'axios'
import CancelRepeatRequest from './cancelRepeatRequest'

const service = axios.create({
  baseURL: '',
  timeout: 60000
})

function getParams(config: AxiosRequestConfig): ObjectType {
  const obj = {
    post: 'data',
    get: 'params'
  } as const
  const key = obj[config.method as 'get']
  return config[key]
}

// 取消重复请求
const cancelRequest = new CancelRepeatRequest()

service.interceptors.request.use(
  config => {
    const params = getParams(config)

    // 取消重复请求
    if (params.noCancel) {
      delete params.noCancel
    } else {
      cancelRequest.remove(config, params)
      cancelRequest.add(config, params)
    }

    return config
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const {
      config,
      data: { code }
    } = response
    // 取消重复请求
    cancelRequest.remove(config)

    // 非正常状态处理
    if (code !== '0') {
      // ----------------------------------------------
    }
    // 正常状态返回
    return response
  },
  (error: any) => {
    let code: string | null = ''
    if (error.response) {
      code = error.response.status
    } else if ('message' in error && !error.message) {
      console.log('取消重复请求', error)
      code = null
    } else {
      code = '网络已断开'
    }
    if (code !== null) {
    }
    return Promise.reject(error)
  }
)
// export function post<T> (url:string, args = {}, config = {}) {
//   return service.post<ResponseDataType<T>>(url, args, config)
// }
export const __post = <T>(url: string, args = {}, config = {}) =>
  service.post<ResponseDataType<T>>(url, args, config)
export const __get = <T>(url: string, args = {}, config = {}) =>
  service.get<ResponseDataType<T>>(url, { params: args, ...config })

export default service
