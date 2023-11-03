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

  findById(recipientId: UniqueEntityId): Promise<Recipient | null> {
    throw new Error('Method not implemented.')
  }

  deleteById(recipientId: UniqueEntityId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(recipient: Recipient): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
