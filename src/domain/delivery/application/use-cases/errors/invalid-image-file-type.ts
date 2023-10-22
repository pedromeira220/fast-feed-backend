import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidImageFileType extends Error implements UseCaseError {
  constructor(fileType: string) {
    super(`Invalid image file type: ${fileType}`)
  }
}
