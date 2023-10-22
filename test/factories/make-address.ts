import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Address,
  AddressProps,
} from '@/domain/delivery/enterprise/entities/address'
import { Coordinate } from '@/domain/delivery/enterprise/entities/value-objects/coordinate'

import { faker } from '@faker-js/faker'

export const makeAddress = (
  override: Partial<AddressProps> = {},
  id?: UniqueEntityId,
) => {
  return Address.create(
    {
      city: faker.location.city(),
      complement: faker.location.secondaryAddress(),
      country: faker.location.country(),
      number: faker.location.buildingNumber(),
      state: faker.location.state(),
      street: faker.location.street(),
      district: faker.lorem.words({ max: 3, min: 2 }),
      zipCode: faker.location.zipCode(),
      coordinate: Coordinate.create({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      }),
      ...override,
    },
    id,
  )
}
