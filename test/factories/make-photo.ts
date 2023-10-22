import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Photo, PhotoProps } from '@/domain/delivery/enterprise/entities/photo'

import { faker } from '@faker-js/faker'

export const makePhoto = (
  override: Partial<PhotoProps> = {},
  id?: UniqueEntityId,
) => {
  return Photo.create(
    {
      fileName: faker.lorem.word() + '.png',
      src: faker.image.url(),
      ...override,
    },
    id,
  )
}
