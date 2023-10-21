import { Shipment } from './../../enterprise/entities/shipment'
import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientNotFoundError } from './errors/recipient-not-found-error'

interface CreateShipmentUseCaseRequest {
  name: string
  recipientId: string
}

type CreateShipmentUseCaseResponse = Either<
  RecipientNotFoundError,
  {
    shipment: Shipment
  }
>

export class CreateShipmentUseCase {
  constructor(
    private shipmentRepository: ShipmentRepository,
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    name,
    recipientId,
  }: CreateShipmentUseCaseRequest): Promise<CreateShipmentUseCaseResponse> {
    const recipientFound = await this.recipientRepository.findById(
      new UniqueEntityId(recipientId),
    )

    if (!recipientFound) {
      return failure(new RecipientNotFoundError())
    }

    const shipment = Shipment.create({
      name,
      recipientId: new UniqueEntityId(recipientId),
    })

    await this.shipmentRepository.create(shipment)

    return success({
      shipment,
    })
  }
}
