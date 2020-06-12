import { createParamDecorator } from '@nestjs/common'
/**
 * @param data 表示装饰器传入参数
 * @param req request
 */
export default createParamDecorator((data: string, req) => {
  return data ? req.user && req.user[data] : req.user;
})