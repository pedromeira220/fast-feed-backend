import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PhotoProps {
  src: string
  fileName: string
}

export class Photo extends Entity<PhotoProps> {
  get src() {
    return this.props.src
  }

  get fileName() {
    return this.props.fileName
  }

  static create(props: PhotoProps, id?: UniqueEntityId) {
    const photo = new Photo(props, id)

    return photo
  }
}
