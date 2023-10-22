import { Either, failure, success } from '@/core/either'
import { Photo } from '../../enterprise/entities/photo'
import { InvalidImageFileType } from './errors/invalid-image-file-type'
import { Uploader } from '../storage/uploader'
import { PhotoRepository } from '../repositories/photo-repository'

interface UploadAndCreatePhotoUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreatePhotoUseCaseResponse = Either<
  InvalidImageFileType,
  {
    photo: Photo
  }
>

export class UploadAndCreatePhotoUseCase {
  constructor(
    private uploader: Uploader,
    private photoRepository: PhotoRepository,
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: UploadAndCreatePhotoUseCaseRequest): Promise<UploadAndCreatePhotoUseCaseResponse> {
    if (
      !/^(image\/(jpeg|png|gif|bmp|tiff)|application\/(x-icon|x-ico))$/.test(
        fileType,
      )
    )
      return failure(new InvalidImageFileType(fileType))

    const { src } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    })

    const photo = Photo.create({
      fileName,
      src,
    })

    await this.photoRepository.create(photo)

    return success({ photo })
  }
}
