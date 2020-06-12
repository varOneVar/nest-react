import axios, { AxiosRequestConfig } from 'axios'

/**
 * config 和params参数得是axios请求里的config和params，耦合度比较高
 */
class CancelRepeatRequest {
  public requestPool: Request.requestPoolItem[]
  public requestParams: ObjectType
  constructor() {
    this.requestPool = []
    this.requestParams = {}
  }
  add(config: AxiosRequestConfig, params: ObjectType) {
    const { url, method } = config
    this.requestParams = params
    config.cancelToken = new axios.CancelToken(cancel => {
      const cancelInfo = {
        flag: `url=${url}&request_method=${method}&request_params=${JSON.stringify(params)}`,
        cancel,
      }
      this.requestPool.push(cancelInfo)
    })
  }

  remove(config: AxiosRequestConfig, params: ObjectType = this.requestParams) {
    const { url, method, } = config
    const flag = `url=${url}&request_method=${method}&request_params=${JSON.stringify(params)}`
    let i = 0;
    while (i < this.requestPool.length) {
      if (this.requestPool[i].flag === flag) {
        this.requestPool[i].cancel()
        this.requestPool.splice(i, 1)
      } else {
        i++
      }
    }
    this.requestParams = {}
  }
}

export default CancelRepeatRequest
