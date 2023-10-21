import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Shipment,
  ShipmentProps,
} from '@/domain/delivery/enterprise/entities/shipment'
import { faker } from '@faker-js/faker'

export const makeShipment = (
  override: Partial<ShipmentProps> = {},
  id?: UniqueEntityId,
) => {
  return Shipment.create(
    {
      name: faker.commerce.product(),
      recipientId: new UniqueEntityId(),
      ...override,
    },
    id,
  )
}
