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
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      console.log('网络开小差(' + error.response.status + ')')
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
      console.log('请求无响应，网络较差或已断开！')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      if (axios.isCancel(error)) {
        console.log('Request canceled（取消重复请求）', error.message)
      } else {
        console.log(`请求失败：（${error.message}）！`)
      }
    }
    console.log(error.config)
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
