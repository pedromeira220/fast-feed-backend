import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Prisma } from '@prisma/client'

export class PrismaRecipientMapper {
  static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      name: recipient.name,
      id: recipient.id.toString(),
    }
  }
}
