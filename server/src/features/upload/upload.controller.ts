import { Controller, Post } from '@nestjs/common'
import { UploadService } from './upload.service'


@Controller('upload')
export class UploadController {
  constructor(private readonly service: UploadService) { }

  @Post('img')
  async imgUpload(): Promise<ResponseResultObj> {
    const result = await this.service.imgUpload()
    return result
  }

}