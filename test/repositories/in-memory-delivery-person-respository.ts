import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveryPersonRepository } from '@/domain/delivery/application/repositories/delivery-person-repository'
import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }

  async findById(
    deliveryPersonId: UniqueEntityId,
  ): Promise<DeliveryPerson | null> {
    const deliveryPersonFound = this.items.find((deliveryPerson) =>
      deliveryPerson.id.equals(deliveryPersonId),
    )

    if (!deliveryPersonFound) return null

    return deliveryPersonFound
  }
}
