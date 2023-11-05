import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client'

export class PrismaRecipientMapper {
  static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      name: recipient.name,
      id: recipient.id.toString(),
    }
  }

  static toDomain(recipient: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        name: recipient.name,
      },
      new UniqueEntityId(recipient.id),
    )
  }
}
