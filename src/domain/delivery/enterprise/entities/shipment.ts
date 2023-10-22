import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Address } from './address'

export enum ShipmentStatus {
  'WAITING' = 'WAITING',
  'PICKED_UP' = 'PICKED_UP',
  'DELIVERED' = 'DELIVERED',
  'UNSET' = 'UNSET',
}

export interface ShipmentProps {
  name: string
  status: ShipmentStatus
  recipientId: UniqueEntityId
  createdAt: Date
  pickupDate: Date | null
  deliveryDate: Date | null
  deliveryPersonId: UniqueEntityId | null
  deliveryAddress: Address
}

export class Shipment extends AggregateRoot<ShipmentProps> {
  get name() {
    return this.props.name
  }

  get status() {
    return this.props.status
  }

  set status(value: ShipmentStatus) {
    this.props.status = value
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

  get deliveryPersonId() {
    return this.props.deliveryPersonId
  }

  get deliveryAddress() {
    return this.props.deliveryAddress
  }

  pickUp(deliveryPersonIdWhoPickedUp: UniqueEntityId) {
    this.props.pickupDate = new Date()
    this.props.deliveryPersonId = deliveryPersonIdWhoPickedUp
  }

  static create(
    props: Optional<
      ShipmentProps,
      | 'createdAt'
      | 'deliveryDate'
      | 'pickupDate'
      | 'status'
      | 'deliveryPersonId'
    >,
    id?: UniqueEntityId,
  ) {
    const shipment = new Shipment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deliveryDate: props.deliveryDate ?? null,
        pickupDate: props.pickupDate ?? null,
        status: props.status ?? ShipmentStatus.UNSET,
        deliveryPersonId: props.deliveryPersonId ?? null,
      },
      id,
    )

    return shipment
  }
}
