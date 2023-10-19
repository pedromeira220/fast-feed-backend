import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/delivery/enterprise/entities/recipient'
import { faker } from '@faker-js/faker'

export const makeRecipient = (
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityId,
) => {
  return Recipient.create(
    {
      name: faker.person.fullName(),
      ...override,
    },
    id,
  )
}
