import { UseCaseError } from '@/core/errors/use-case-error'

export class ShipmentNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Shipment not found')
  }
}
