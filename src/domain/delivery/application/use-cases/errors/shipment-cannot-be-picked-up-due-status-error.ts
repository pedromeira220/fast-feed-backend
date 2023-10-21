import { UseCaseError } from '@/core/errors/use-case-error'

export class ShipmentCannotBePickedUpDueStatusError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Shipment cannot be picked up due status')
  }
}
