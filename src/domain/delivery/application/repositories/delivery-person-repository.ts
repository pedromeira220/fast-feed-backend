import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export abstract class DeliveryPersonRepository {
  abstract create(deliveryPerson: DeliveryPerson): Promise<void>
}
