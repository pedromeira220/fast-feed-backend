import { PaginationParams } from '@/core/repositories/pagination-params'
import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Shipment } from '../../enterprise/entities/shipment'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonNotFoundError } from './errors/delivery-person-not-found-error'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { InvalidPaginationParamsError } from '@/core/repositories/errors/invalid-pagination-params-error'

interface FetchShipmentsFromDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
  pageNumber?: number
  itemsPerPage?: number
}

type FetchShipmentsFromDeliveryPersonUseCaseResponse = Either<
  DeliveryPersonNotFoundError | InvalidPaginationParamsError,
  {
    shipments: Shipment[]
  }
>

export class FetchShipmentsFromDeliveryPersonUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private shipmentRepository: ShipmentRepository,
  ) {}

  async execute({
    deliveryPersonId,
    itemsPerPage,
    pageNumber,
  }: FetchShipmentsFromDeliveryPersonUseCaseRequest): Promise<FetchShipmentsFromDeliveryPersonUseCaseResponse> {
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

    const shipmentsFromDeliveryPerson =
      await this.shipmentRepository.findManyByDeliveryPersonId(
        new UniqueEntityId(deliveryPersonId),
        resultPaginationParams.value,
      )

    return success({ shipments: shipmentsFromDeliveryPerson })
  }
}
