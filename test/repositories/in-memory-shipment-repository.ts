import { ShipmentRepository } from '@/domain/delivery/application/repositories/shipment-repository'
import { Shipment } from './../../src/domain/delivery/enterprise/entities/shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'

export class InMemoryShipmentRepository implements ShipmentRepository {
  public items: Shipment[] = []

  async create(shipment: Shipment): Promise<void> {
    this.items.push(shipment)
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
}
