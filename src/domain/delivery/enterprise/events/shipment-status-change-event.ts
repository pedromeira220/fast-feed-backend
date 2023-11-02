import { DomainEvent } from '@/core/events/domain-event'
import { Shipment, ShipmentStatus } from '../entities/shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class ShipmentStatusChangeEvent implements DomainEvent {
  public ocurredAt: Date
  public shipment: Shipment
  public previousStatus: ShipmentStatus
  public currentStatus: ShipmentStatus

  constructor(shipment: Shipment, previousStatus: ShipmentStatus) {
    this.shipment = shipment
    this.ocurredAt = new Date()
    this.previousStatus = previousStatus
    this.currentStatus = shipment.status
  }

  public getAggregateId(): UniqueEntityId {
    return this.shipment.id
  }
}
