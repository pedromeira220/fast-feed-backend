import { UseCaseError } from '../../../../../core/errors/use-case-error'

export class CannotMarkShipmentAsReturnedThatWasNotPickedUp
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Cannot mark shipment as returned that was not picked up')
  }
}
