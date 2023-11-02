import { CannotMarkShipmentAsReturnedThatWasNotPickedUp } from './errors/cannot-mark-shipment-as-returned-that-was-not-picked-up'
import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ShipmentStatus } from '../../enterprise/entities/shipment'

interface MarkShipmentAsReturnedUseCaseRequest {
  deliveryPersonId: string
  shipmentId: string
}

type MarkShipmentAsReturnedUseCaseResponse = Either<
  | ShipmentNotFoundError
  | NotAllowedError
  | CannotMarkShipmentAsReturnedThatWasNotPickedUp,
  null
>

export class MarkShipmentAsReturnedUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute({
    shipmentId,
    deliveryPersonId,
  }: MarkShipmentAsReturnedUseCaseRequest): Promise<MarkShipmentAsReturnedUseCaseResponse> {
    const shipmentFound = await this.shipmentRepository.findById(
      new UniqueEntityId(shipmentId),
    )

    if (!shipmentFound) {
      return failure(new ShipmentNotFoundError())
    }

    if (
      !!shipmentFound.deliveryPersonId &&
      !shipmentFound.deliveryPersonId.equals(
        new UniqueEntityId(deliveryPersonId),
      )
    ) {
      return failure(new NotAllowedError())
    }

    if (shipmentFound.status !== ShipmentStatus.PICKED_UP)
      return failure(new CannotMarkShipmentAsReturnedThatWasNotPickedUp())

    shipmentFound.returnShipment()

    await this.shipmentRepository.save(shipmentFound)

    return success(null)
  }
}
