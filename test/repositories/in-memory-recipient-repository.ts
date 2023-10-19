import { Recipient } from './../../src/domain/delivery/enterprise/entities/recipient'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async findById(recipientId: UniqueEntityId): Promise<Recipient | null> {
    const recipientFound = this.items.find((recipient) =>
      recipient.id.equals(recipientId),
    )

    if (!recipientFound) {
      return null
    }

    return recipientFound
  }

  async deleteById(recipientId: UniqueEntityId): Promise<void> {
    const itemIndex = this.items.findIndex((recipient) =>
      recipient.id.equals(recipientId),
    )

    this.items.splice(itemIndex, 1)
  }

  async save(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((recipient) =>
      recipient.id.equals(recipient.id),
    )

    this.items[itemIndex] = recipient
  }
}
