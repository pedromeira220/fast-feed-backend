import { Shipment } from './../../enterprise/entities/shipment'
import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientNotFoundError } from './errors/recipient-not-found-error'
import { Address } from '../../enterprise/entities/address'
import { Coordinate } from '../../enterprise/entities/value-objects/coordinate'

interface CreateShipmentUseCaseRequest {
  name: string
  recipientId: string
  address: {
    latitude: number
    longitude: number
    street: string
    district: string
    city: string
    number: string
    complement: string | null
    state: string
    country: string
    zipCode: string
  }
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
    address,
  }: CreateShipmentUseCaseRequest): Promise<CreateShipmentUseCaseResponse> {
    const recipientFound = await this.recipientRepository.findById(
      new UniqueEntityId(recipientId),
    )

    if (!recipientFound) {
      return failure(new RecipientNotFoundError())
    }

    const deliveryAddress = Address.create({
      city: address.city,
      coordinate: Coordinate.create({
        latitude: address.latitude,
        longitude: address.longitude,
      }),
      country: address.country,
      district: address.district,
      number: address.number,
      state: address.state,
      street: address.street,
      zipCode: address.zipCode,
      complement: address.complement,
    })

    const shipment = Shipment.create({
      name,
      recipientId: new UniqueEntityId(recipientId),
      deliveryAddress,
    })

    await this.shipmentRepository.create(shipment)

    return success({
      shipment,
    })
  }
}
