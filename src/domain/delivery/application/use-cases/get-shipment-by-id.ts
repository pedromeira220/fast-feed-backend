import { Either, failure, success } from '@/core/either'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Shipment } from '../../enterprise/entities/shipment'

interface GetShipmentByIdUseCaseRequest {
  shipmentId: string
}

type GetShipmentByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shipment: Shipment
  }
>

export class GetShipmentByIdUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute({
    shipmentId,
  }: GetShipmentByIdUseCaseRequest): Promise<GetShipmentByIdUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(
      new UniqueEntityId(shipmentId),
    )

    if (!shipment) {
      return failure(new ResourceNotFoundError())
    }

    return success({ shipment })
  }
}
