import { DeliveryConfirmationPhoto } from './../../enterprise/entities/delivery-confirmation-photo'
import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { PhotoRepository } from '../repositories/photo-repository'
import { PhotoNotFoundError } from './errors/photo-not-found-error'

interface MarkShipmentAsDeliveredUseCaseRequest {
  deliveryPersonId: string
  shipmentId: string
  photoId: string
}

type MarkShipmentAsDeliveredUseCaseResponse = Either<
  ShipmentNotFoundError | NotAllowedError | PhotoNotFoundError,
  null
>

export class MarkShipmentAsDeliveredUseCase {
  constructor(
    private shipmentRepository: ShipmentRepository,
    private photoRepository: PhotoRepository,
  ) {}

  async execute({
    shipmentId,
    deliveryPersonId,
    photoId,
  }: MarkShipmentAsDeliveredUseCaseRequest): Promise<MarkShipmentAsDeliveredUseCaseResponse> {
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

    const photoFound = await this.photoRepository.findById(
      new UniqueEntityId(photoId),
    )

    if (!photoFound) {
      return failure(new PhotoNotFoundError())
    }

    const deliveryConfirmationPhoto = DeliveryConfirmationPhoto.create({
      photoId: photoFound.id,
      shipmentId: shipmentFound.id,
    })

    shipmentFound.delivery(deliveryConfirmationPhoto)

    await this.shipmentRepository.save(shipmentFound)

    return success(null)
  }
}
