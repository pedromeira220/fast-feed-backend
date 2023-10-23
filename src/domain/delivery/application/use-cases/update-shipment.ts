import { Either, failure, success } from '@/core/either'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'

interface UpdateShipmentUseCaseRequest {
  shipmentId: string
  name?: string
}

type UpdateShipmentUseCaseResponse = Either<ShipmentNotFoundError, null>

export class UpdateShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute({
    shipmentId,
    name,
  }: UpdateShipmentUseCaseRequest): Promise<UpdateShipmentUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(
      new UniqueEntityId(shipmentId),
    )

    if (!shipment) {
      return failure(new ShipmentNotFoundError())
    }

    if (name) shipment.name = name

    await this.shipmentRepository.save(shipment)

    return success(null)
  }
}
