import { Injectable } from '@nestjs/common'
import { Model, Document } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import md52 from '../../common/utils/crypto'

interface User extends Document {
  username: string,
  pwd: string,
  avator: string,
  age: number,
  Id_Card: string,
}


@Injectable()
export class UserService {
  constructor(
    @InjectModel('UserInfo') private readonly userModel: Model<User>
  ) { }

  async login(userInfo: UserInfo): Promise<ResponseResultObj> {
    try {
      const pwd = md52(userInfo.pwd)
      const exist = await this.userModel.findOne({ username: userInfo.username })
      if (!exist) {
        return {
          code: '1',
          msg: '该用户不存在',
          data: 'fail'
        };
      } else {
        if (exist.pwd !== pwd) {
          return {
            code: '1',
            msg: '账号或密码错误！',
            data: 'fail'
          };
        }
        return {
          code: '0',
          msg: '操作成功！',
          data: exist,
        };
      }

    } catch (error) {
      return {
        code: '2',
        msg: error.message,
        data: error
      }
    }
  }
  async registry(userInfo: UserInfo): Promise<ResponseResultObj> {
    try {
      const exist = await this.userModel.findOne({ username: userInfo.username })
      if (exist) {
        return {
          code: '1',
          msg: '该用户已存在',
          data: 'fail'
        };
      }
      const createUser = new this.userModel({
        username: userInfo.username,
        pwd: md52(userInfo.pwd)
      })
      const result = await createUser.save()
      return {
        code: '0',
        msg: null,
        data: result
      };
    } catch (error) {
      return {
        code: '2',
        msg: error.message,
        data: error
      }
    }
  }
}