import { UseCaseError } from '@/core/errors/use-case-error'

export class PhotoNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Photo not found')
  }
}
