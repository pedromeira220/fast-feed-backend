import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

const status = ['WAITING', 'PICKED_UP', 'DELIVERED'] as const
type Status = (typeof status)[number]

export interface ShipmentProps {
  name: string
  status: Status
  recipientId: UniqueEntityId
  createdAt: Date
  pickupDate: Date | null
  deliveryDate: Date | null
}

export class Shipment extends Entity<ShipmentProps> {
  get name() {
    return this.props.name
  }

  get status() {
    return this.props.status
  }

  get recipientId() {
    return this.props.recipientId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get pickupDate() {
    return this.props.pickupDate
  }

  get deliveryDate() {
    return this.props.deliveryDate
  }

  static create(
    props: Optional<
      ShipmentProps,
      'createdAt' | 'deliveryDate' | 'pickupDate' | 'status'
    >,
    id?: UniqueEntityId,
  ) {
    const shipment = new Shipment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deliveryDate: props.deliveryDate ?? null,
        pickupDate: props.pickupDate ?? null,
        status: props.status ?? 'WAITING',
      },
      id,
    )

    return shipment
  }
}
