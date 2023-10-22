import { PaginationParams } from '@/core/repositories/pagination-params'
import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Shipment } from '../../enterprise/entities/shipment'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found-error'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { InvalidPaginationParamsError } from '@/core/repositories/errors/invalid-pagination-params-error'

interface FetchShipmentsNearbyDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
  deliveryPersonLatitude: number
  deliveryPersonLongitude: number

  pageNumber?: number
  itemsPerPage?: number
}

type FetchShipmentsNearbyDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError | InvalidPaginationParamsError,
  {
    shipments: Shipment[]
  }
>

export class FetchShipmentsNearbyDeliveryPersonUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private shipmentRepository: ShipmentRepository,
  ) {}

  async execute({
    deliveryPersonId,
    deliveryPersonLatitude,
    deliveryPersonLongitude,

    itemsPerPage,
    pageNumber,
  }: FetchShipmentsNearbyDeliveryPersonUseCaseRequest): Promise<FetchShipmentsNearbyDeliveryPersonUseCaseResponse> {
    const deliveryPerson = await this.deliveryPersonRepository.findById(
      new UniqueEntityId(deliveryPersonId),
    )

    if (!deliveryPerson) {
      return failure(new DeliveryPersonNotFoundError())
    }

    const resultPaginationParams = PaginationParams.create({
      itemsPerPage,
      pageNumber,
    })

    if (resultPaginationParams.isFailure()) {
      return failure(resultPaginationParams.value)
    }

    const shipmentsNearbyDeliveryPerson =
      await this.shipmentRepository.findManyNearbyDeliveryPerson(
        {
          deliveryPersonId: new UniqueEntityId(deliveryPersonId),
          deliveryPersonLatitude,
          deliveryPersonLongitude,
        },
        resultPaginationParams.value,
      )

    return success({ shipments: shipmentsNearbyDeliveryPerson })
  }
}
