import { Module, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './index.schema'
import { UserController } from './index.controller'
import { AuthService } from './auth.service'
import { UserService } from './index.service'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstans } from './constans'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserInfo', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstans.secret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [UserController],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  exports: [AuthService]
})
export class UserInfoModule { }