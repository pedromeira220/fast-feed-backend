import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'

export class DeliveryPersonPresenter {
  static toHttp(deliveryPerson: DeliveryPerson) {
    return {
      id: deliveryPerson.id.toString(),
      name: deliveryPerson.name,
      cpf: deliveryPerson.cpf,
    }
  }
}
