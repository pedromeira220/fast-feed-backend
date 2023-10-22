import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found-error'

interface GetDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
}

type GetDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError,
  {
    deliveryPerson: DeliveryPerson
  }
>

export class GetDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({
    deliveryPersonId,
  }: GetDeliveryPersonUseCaseRequest): Promise<GetDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPersonRepository.findById(
      new UniqueEntityId(deliveryPersonId),
    )

    if (!deliveryPerson) {
      return failure(new DeliveryPersonNotFoundError())
    }

    return success({ deliveryPerson })
  }
}
