import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Shipment } from '../../enterprise/entities/shipment'

export abstract class ShipmentRepository {
  abstract create(shipment: Shipment): Promise<void>
  abstract findById(shipmentId: UniqueEntityId): Promise<Shipment | null>
  abstract deleteById(shipmentId: UniqueEntityId): Promise<void>
  abstract save(shipment: Shipment): Promise<void>
}
