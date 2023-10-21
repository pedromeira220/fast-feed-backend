import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/delivery/enterprise/entities/delivery-person'

import { faker } from '@faker-js/faker'

export const makeDeliveryPerson = (
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueEntityId,
) => {
  return DeliveryPerson.create(
    {
      name: faker.commerce.product(),
      cpf: faker.finance.accountNumber({
        length: 11,
      }),
      ...override,
    },
    id,
  )
}
