import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { PrismaService } from '../prisma.service'
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.create({
      data,
    })
  }

  async findById(recipientId: UniqueEntityId): Promise<Recipient | null> {
    const recipientFound = await this.prisma.recipient.findUnique({
      where: {
        id: recipientId.toString(),
      },
    })

    if (!recipientFound) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipientFound)
  }

  async deleteById(recipientId: UniqueEntityId): Promise<void> {
    await this.prisma.recipient.delete({
      where: {
        id: recipientId.toString(),
      },
    })
  }

  async save(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.update({
      where: {
        id: recipient.id.toString(),
      },
      data: PrismaRecipientMapper.toPrisma(recipient),
    })
  }
}
