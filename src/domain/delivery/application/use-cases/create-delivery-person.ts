import { DeliveryPerson } from './../../enterprise/entities/delivery-person'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'

interface CreateDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
}

type CreateDeliveryPersonUseCaseResponse = {
  deliveryPerson: DeliveryPerson
}

export class CreateDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({
    cpf,
    name,
  }: CreateDeliveryPersonUseCaseRequest): Promise<CreateDeliveryPersonUseCaseResponse> {
    const deliveryPerson = DeliveryPerson.create({
      cpf,
      name,
    })

    await this.deliveryPersonRepository.create(deliveryPerson)

    return {
      deliveryPerson,
    }
  }
}
