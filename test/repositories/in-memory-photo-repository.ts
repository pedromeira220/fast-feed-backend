import { Photo } from './../../src/domain/delivery/enterprise/entities/photo'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PhotoRepository } from '@/domain/delivery/application/repositories/photo-repository'

export class InMemoryPhotoRepository implements PhotoRepository {
  public items: Photo[] = []

  async create(photo: Photo): Promise<void> {
    this.items.push(photo)
  }

  async findById(photoId: UniqueEntityId): Promise<Photo | null> {
    const photoFound = this.items.find((photo) => photo.id.equals(photoId))

    if (!photoFound) {
      return null
    }

    return photoFound
  }
}
