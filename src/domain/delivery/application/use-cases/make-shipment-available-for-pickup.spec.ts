import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { makeShipment } from '@test/factories/make-shipment'
import { MakeShipmentAvailableForPickupUseCase } from './make-shipment-available-for-pickup'
import { ShipmentStatus } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let sut: MakeShipmentAvailableForPickupUseCase

describe('Make shipment available for pickup', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()

    sut = new MakeShipmentAvailableForPickupUseCase(inMemoryShipmentRepository)
  })

  it('should be able to make a shipment available for pickup', async () => {
    const previousCreatedShipment = makeShipment()

    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const result = await sut.execute({
      shipmentId: previousCreatedShipment.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items).toHaveLength(1)
    expect(inMemoryShipmentRepository.items[0].status).toBe(
      ShipmentStatus.WAITING,
    )
  })

  it('should not be able to make a shipment available for pickup that does not exists', async () => {
    const result = await sut.execute({
      shipmentId: 'fake-shipment-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })
})
