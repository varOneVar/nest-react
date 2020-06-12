import { IsString } from 'class-validator'

export class UserInfoDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly pwd: string;
}