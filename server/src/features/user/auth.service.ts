import { Injectable } from '@nestjs/common'
import { UserService } from './index.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async authLogin(userInfo: UserInfo): Promise<ResponseResultObj> {
    const user = await this.userService.login(userInfo)
    if (user.code === '0') {
      const obj = { ...user.data }
      user.data.access_token = this.jwtService.sign(obj)
      return user
    }
  }
}
