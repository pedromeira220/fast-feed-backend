import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found-error'
import { ShipmentStatus } from '../../enterprise/entities/shipment'
import { ShipmentCannotBePickedUpDueStatusError } from './errors/shipment-cannot-be-picked-up-due-status-error'

interface PickUpShipmentUseCaseRequest {
  shipmentId: string
  deliveryPersonId: string
}

type PickUpShipmentUseCaseResponse = Either<
  | ShipmentNotFoundError
  | DeliveryPersonNotFoundError
  | ShipmentCannotBePickedUpDueStatusError,
  null
>

export class PickUpShipmentUseCase {
  constructor(
    private shipmentRepository: ShipmentRepository,
    private deliveryPersonRepository: DeliveryPersonRepository,
  ) {}

  async execute({
    shipmentId,
    deliveryPersonId,
  }: PickUpShipmentUseCaseRequest): Promise<PickUpShipmentUseCaseResponse> {
    const shipmentFound = await this.shipmentRepository.findById(
      new UniqueEntityId(shipmentId),
    )

    if (!shipmentFound) {
      return failure(new ShipmentNotFoundError())
    }

    if (shipmentFound.status !== ShipmentStatus.WAITING) {
      return failure(new ShipmentCannotBePickedUpDueStatusError())
    }

    const deliveryPersonFound = await this.deliveryPersonRepository.findById(
      new UniqueEntityId(deliveryPersonId),
    )

    if (!deliveryPersonFound) {
      return failure(new DeliveryPersonNotFoundError())
    }

    shipmentFound.pickUp(new UniqueEntityId(deliveryPersonId))

    await this.shipmentRepository.save(shipmentFound)

    return success(null)
  }
}
