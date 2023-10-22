import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found-error'

interface DeleteDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
}

type DeleteDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError,
  null
>

export class DeleteDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({
    deliveryPersonId,
  }: DeleteDeliveryPersonUseCaseRequest): Promise<DeleteDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPersonRepository.findById(
      new UniqueEntityId(deliveryPersonId),
    )

    if (!deliveryPerson) {
      return failure(new DeliveryPersonNotFoundError())
    }

    await this.deliveryPersonRepository.deleteById(deliveryPerson.id)

    return success(null)
  }
}
