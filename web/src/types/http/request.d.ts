import { Canceler } from 'axios'

declare global {

  namespace Request {
    interface requestPoolItem {
      flag: string;
      cancel: Canceler;
    }
  }
  interface ResponseDataType<T> {
    data: T;
    code: string;
    msg: string|null;
  }
  
}
