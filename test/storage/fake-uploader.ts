import {
  UploadParams,
  Uploader,
} from '@/domain/delivery/application/storage/uploader'
import { randomUUID } from 'crypto'

interface Upload {
  fileName: string
  src: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploadParams): Promise<{ src: string }> {
    const src = randomUUID()

    this.uploads.push({
      fileName,
      src,
    })

    return { src }
  }
}
