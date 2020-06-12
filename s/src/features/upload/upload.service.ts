import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {

  imgUpload() {
    return {
      code: '0',
      data: null,
      msg: 'success'
    }
  }
}