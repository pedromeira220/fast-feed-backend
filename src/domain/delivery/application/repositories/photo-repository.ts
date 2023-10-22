import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Photo } from '../../enterprise/entities/photo'

export abstract class PhotoRepository {
  abstract create(photo: Photo): Promise<void>
  abstract findById(recipientId: UniqueEntityId): Promise<Photo | null>
}
