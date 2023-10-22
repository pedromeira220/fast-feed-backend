import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface DeliveryConfirmationPhotoProps {
  photoId: UniqueEntityId
  shipmentId: UniqueEntityId
}

export class DeliveryConfirmationPhoto extends Entity<DeliveryConfirmationPhotoProps> {
  get photoId() {
    return this.props.photoId
  }

  get shipmentId() {
    return this.props.shipmentId
  }

  static create(props: DeliveryConfirmationPhotoProps, id?: UniqueEntityId) {
    return new DeliveryConfirmationPhoto(props, id)
  }
}
