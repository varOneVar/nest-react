import { Controller, Post, Body, Request, SetMetadata, UseGuards, Get } from '@nestjs/common'
import { UserService } from './index.service'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../../common/guards/local-auth.guard'
import { UserInfoDto } from './dto/login-registry.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @SetMetadata('role', ['admin'])
  async login(@Body() userInfo: UserInfoDto): Promise<ResponseResultObj> {
    const result = await this.authService.authLogin(userInfo)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Post('registry')
  @SetMetadata('role', ['admin'])
  async registry(@Body() userInfo: UserInfoDto): Promise<ResponseResultObj> {
    const result = await this.userService.registry(userInfo)
    return result
  }
}