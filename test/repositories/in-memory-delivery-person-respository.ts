import { DeliveryPersonRepository } from '@/domain/delivery/application/repositories/delivery-person-repository'
import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }
}
