import { makeShipment } from '@test/factories/make-shipment'
import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { UpdateShipmentUseCase } from './update-shipment'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let sut: UpdateShipmentUseCase

describe('Update shipment by id', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    sut = new UpdateShipmentUseCase(inMemoryShipmentRepository)
  })

  it('should be able to update a shipment ', async () => {
    const newShipment = makeShipment()

    inMemoryShipmentRepository.items.push(newShipment)

    const result = await sut.execute({
      shipmentId: newShipment.id.toString(),
      name: 'New shipment name',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items[0].name).toBe('New shipment name')
  })
})
