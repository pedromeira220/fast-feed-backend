import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository'
import { UploadAndCreatePhotoUseCase } from './upload-and-create-photo'
import { FakeUploader } from '@test/storage/fake-uploader'
import { InvalidImageFileType } from './errors/invalid-image-file-type'

let inMemoryPhotoRepository: InMemoryPhotoRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreatePhotoUseCase

describe('Upload and create photo', () => {
  beforeEach(() => {
    inMemoryPhotoRepository = new InMemoryPhotoRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreatePhotoUseCase(fakeUploader, inMemoryPhotoRepository)
  })

  it('should be able to upload a photo', async () => {
    const result = await sut.execute({
      body: Buffer.from(''),
      fileName: 'profile.png',
      fileType: 'image/png',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryPhotoRepository.items).toHaveLength(1)
    expect(fakeUploader.upload).toHaveLength(1)
  })

  it('should not be able to upload a photo with an invalid mime type', async () => {
    const result = await sut.execute({
      body: Buffer.from(''),
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidImageFileType)
  })
})
