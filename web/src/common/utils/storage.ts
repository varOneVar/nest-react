// 序列化
export function serialize(val: any) {
  return JSON.stringify(val)
}

// 反序列化
export function deserialize(val:string|null) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}


class StorageJS {
  storage: Storage
  session: StorageJS
  constructor(public Key: string = '__storagejs__') {
    this.storage = window.localStorage
    this.session = this
    this.session.storage = window.sessionStorage
  }
  set(key: string, val: any) {
    this.storage.setItem(this.Key + key, serialize(val))
    return val
  }
  get(key: string, def?: any) {
    const result = deserialize(this.storage.getItem(this.Key + key))
    return result === undefined ? def : result
  }
  has (key: string) {
    return this.get(this.Key + key) !== undefined
  }
  remove(key: string) {
    this.storage.removeItem(this.Key + key)
  }
  clear() {
    this.storage.clear()
  }
  forEach(callback: Function) {
    for (let i = 0; i < this.storage.length; i++) {
      const key: string = this.storage.key(i) || ''
      callback(key, this.get(key))
    }
  }
}
export default StorageJS