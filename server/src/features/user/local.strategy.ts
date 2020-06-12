import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from './index.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserService) {
    super({
      passReqToCallback: true
    })
  }
  async validate(
    username: string,
    password: string
  ): Promise<any> {
    const result = await this.authService.login({ username, pwd: password })
    if (result.code !== '0') {
      throw new UnauthorizedException()
    }
    return result
  }
}