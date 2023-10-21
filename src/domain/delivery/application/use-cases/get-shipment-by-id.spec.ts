import { makeShipment } from '@test/factories/make-shipment'
import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { GetShipmentByIdUseCase } from './get-shipment-by-id'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let sut: GetShipmentByIdUseCase

describe('Get shipment by id', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    sut = new GetShipmentByIdUseCase(inMemoryShipmentRepository)
  })

  it('should be able to get a shipment by id', async () => {
    const newShipment = makeShipment()

    inMemoryShipmentRepository.items.push(newShipment)

    const result = await sut.execute({
      shipmentId: newShipment.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.shipment.name).toBe(newShipment.name)
    }
  })
})
