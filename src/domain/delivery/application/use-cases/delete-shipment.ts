import { Either, failure, success } from '@/core/either'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'

interface DeleteShipmentUseCaseRequest {
  shipmentId: string
}

type DeleteShipmentUseCaseResponse = Either<ShipmentNotFoundError, null>

export class DeleteShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute({
    shipmentId,
  }: DeleteShipmentUseCaseRequest): Promise<DeleteShipmentUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(
      new UniqueEntityId(shipmentId),
    )

    if (!shipment) {
      return failure(new ShipmentNotFoundError())
    }

    await this.shipmentRepository.deleteById(shipment.id)

    return success(null)
  }
}
