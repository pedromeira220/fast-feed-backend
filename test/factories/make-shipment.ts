import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Shipment,
  ShipmentProps,
} from '@/domain/delivery/enterprise/entities/shipment'
import { faker } from '@faker-js/faker'
import { makeAddress } from './make-address'

export const makeShipment = (
  override: Partial<ShipmentProps> = {},
  id?: UniqueEntityId,
) => {
  return Shipment.create(
    {
      name: faker.commerce.product(),
      recipientId: new UniqueEntityId(),
      deliveryAddress: makeAddress(),
      ...override,
    },
    id,
  )
}
