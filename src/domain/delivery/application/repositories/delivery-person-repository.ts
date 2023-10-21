import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export abstract class DeliveryPersonRepository {
  abstract create(deliveryPerson: DeliveryPerson): Promise<void>
  abstract findById(
    deliveryPersonId: UniqueEntityId,
  ): Promise<DeliveryPerson | null>
}
