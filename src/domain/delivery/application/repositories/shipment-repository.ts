import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Shipment } from '../../enterprise/entities/shipment'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface FindManyNearbyDeliveryPersonParams {
  deliveryPersonId: UniqueEntityId
  deliveryPersonLatitude: number
  deliveryPersonLongitude: number
}

export abstract class ShipmentRepository {
  abstract create(shipment: Shipment): Promise<void>
  abstract findById(shipmentId: UniqueEntityId): Promise<Shipment | null>
  abstract deleteById(shipmentId: UniqueEntityId): Promise<void>
  abstract save(shipment: Shipment): Promise<void>
  abstract findManyByDeliveryPersonId(
    deliveryPersonId: UniqueEntityId,
    paginationParams: PaginationParams,
  ): Promise<Shipment[]>

  abstract findManyNearbyDeliveryPerson(
    params: FindManyNearbyDeliveryPersonParams,
    paginationParams: PaginationParams,
  ): Promise<Shipment[]>
}
