import { makeShipment } from '@test/factories/make-shipment'
import { DeleteShipmentUseCase } from './delete-shipment'
import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let sut: DeleteShipmentUseCase

describe('Delete shipment', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    sut = new DeleteShipmentUseCase(inMemoryShipmentRepository)
  })

  it('should be able to delete a shipment', async () => {
    const newShipment = makeShipment()

    inMemoryShipmentRepository.items.push(newShipment)

    const result = await sut.execute({
      shipmentId: newShipment.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items).toHaveLength(0)
  })
})
