import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Recipient } from '../../enterprise/entities/recipient'

export abstract class RecipientRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findById(recipientId: UniqueEntityId): Promise<Recipient | null>
  abstract deleteById(recipientId: UniqueEntityId): Promise<void>
  abstract save(recipient: Recipient): Promise<void>
}
