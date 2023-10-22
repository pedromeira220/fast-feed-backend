import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { ShipmentStatus } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'

interface MakeShipmentAvailableForPickupUseCaseRequest {
  shipmentId: string
}

type MakeShipmentAvailableForPickupUseCaseResponse = Either<
  ShipmentNotFoundError,
  null
>

export class MakeShipmentAvailableForPickupUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute({
    shipmentId,
  }: MakeShipmentAvailableForPickupUseCaseRequest): Promise<MakeShipmentAvailableForPickupUseCaseResponse> {
    const shipmentFound = await this.shipmentRepository.findById(
      new UniqueEntityId(shipmentId),
    )

    if (!shipmentFound) {
      return failure(new ShipmentNotFoundError())
    }

    shipmentFound.status = ShipmentStatus.WAITING

    await this.shipmentRepository.save(shipmentFound)

    return success(null)
  }
}
