import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found-error'

interface UpdateDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
  name?: string
  cpf?: string
}

type UpdateDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError,
  null
>

export class UpdateDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({
    deliveryPersonId,
    name,
    cpf,
  }: UpdateDeliveryPersonUseCaseRequest): Promise<UpdateDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPersonRepository.findById(
      new UniqueEntityId(deliveryPersonId),
    )

    if (!deliveryPerson) {
      return failure(new DeliveryPersonNotFoundError())
    }

    if (name) deliveryPerson.name = name
    if (cpf) deliveryPerson.cpf = cpf

    await this.deliveryPersonRepository.save(deliveryPerson)

    return success(null)
  }
}
