import {
  FindManyNearbyDeliveryPersonParams,
  ShipmentRepository,
} from '@/domain/delivery/application/repositories/shipment-repository'
import {
  Shipment,
  ShipmentStatus,
} from './../../src/domain/delivery/enterprise/entities/shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { getDistanceBetweenCoordinates } from '@/domain/delivery/application/utils/get-distance-between-coordinates'
import { Coordinate } from '@/domain/delivery/enterprise/entities/value-objects/coordinate'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryShipmentRepository implements ShipmentRepository {
  public items: Shipment[] = []

  async create(shipment: Shipment): Promise<void> {
    this.items.push(shipment)

    DomainEvents.dispatchEventsForAggregate(shipment.id)
  }

  async findById(shipmentId: UniqueEntityId): Promise<Shipment | null> {
    const shipmentFound = this.items.find((shipment) =>
      shipment.id.equals(shipmentId),
    )

    if (!shipmentFound) {
      return null
    }

    return shipmentFound
  }

  async deleteById(shipmentId: UniqueEntityId): Promise<void> {
    const itemIndex = this.items.findIndex((shipment) =>
      shipment.id.equals(shipmentId),
    )

    this.items.splice(itemIndex, 1)
  }

  async save(shipment: Shipment): Promise<void> {
    const itemIndex = this.items.findIndex((shipment) =>
      shipment.id.equals(shipment.id),
    )

    this.items[itemIndex] = shipment

    DomainEvents.dispatchEventsForAggregate(shipment.id)
  }

  async findManyByDeliveryPersonId(
    deliveryPersonId: UniqueEntityId,
    paginationParams: PaginationParams,
  ): Promise<Shipment[]> {
    const shipmentsFromDeliveryPerson = this.items.filter((shipment) => {
      if (!shipment.deliveryPersonId) return false

      return shipment.deliveryPersonId.equals(deliveryPersonId)
    })

    const paginatedShipments = shipmentsFromDeliveryPerson.slice(
      paginationParams.itemsPerPage * paginationParams.pageNumber,
      paginationParams.itemsPerPage * (paginationParams.pageNumber + 1),
    )

    return paginatedShipments
  }

  async findManyNearbyDeliveryPerson(
    {
      deliveryPersonId,
      deliveryPersonLatitude,
      deliveryPersonLongitude,
    }: FindManyNearbyDeliveryPersonParams,
    paginationParams: PaginationParams,
  ): Promise<Shipment[]> {
    const shipmentsFromDeliveryPerson = this.items.filter((shipment) => {
      if (!shipment.deliveryPersonId) return false

      return shipment.deliveryPersonId.equals(deliveryPersonId)
    })

    const unassignedPendingShipments = this.items.filter((shipment) => {
      if (shipment.status !== ShipmentStatus.PICKED_UP)
        if (shipment.status !== ShipmentStatus.WAITING) return false

      if (shipment.deliveryPersonId) return false

      return true
    })

    const nearbyShipments = [
      ...shipmentsFromDeliveryPerson,
      ...unassignedPendingShipments,
    ].filter((shipment) => {
      const distance = getDistanceBetweenCoordinates(
        Coordinate.create({
          latitude: shipment.deliveryAddress.coordinate.latitude,
          longitude: shipment.deliveryAddress.coordinate.longitude,
        }),
        Coordinate.create({
          latitude: deliveryPersonLatitude,
          longitude: deliveryPersonLongitude,
        }),
      )

      const MAX_DISTANCE_IN_KILOMETERS = 20

      if (distance > MAX_DISTANCE_IN_KILOMETERS) return false

      return true
    })

    const paginatedShipments = nearbyShipments.slice(
      paginationParams.itemsPerPage * paginationParams.pageNumber,
      paginationParams.itemsPerPage * (paginationParams.pageNumber + 1),
    )

    return paginatedShipments
  }
}
