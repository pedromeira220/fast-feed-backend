import { FetchShipmentsFromDeliveryPersonUseCase } from './fetch-shipments-from-delivery-person'
import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { InMemoryDeliveryPersonRepository } from '@test/repositories/in-memory-delivery-person-respository'
import { makeShipment } from '@test/factories/make-shipment'
import { makeDeliveryPerson } from '@test/factories/make-deliver-person'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: FetchShipmentsFromDeliveryPersonUseCase

describe('Fetch shipments from delivery person', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new FetchShipmentsFromDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      inMemoryShipmentRepository,
    )
  })

  it('should be able to fetch shipments from a specific delivery person', async () => {
    const newDeliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const newShipment = makeShipment({
      deliveryPersonId: newDeliveryPerson.id,
    })
    inMemoryShipmentRepository.items.push(newShipment)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
      pageNumber: 0,
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.shipments).toHaveLength(1)
      expect(result.value.shipments[0].name).toBe(newShipment.name)
    }
  })

  it('should be able to fetch shipments paginated', async () => {
    const newDeliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    for (let i = 0; i < 22; i++) {
      const newShipment = makeShipment({
        deliveryPersonId: newDeliveryPerson.id,
      })
      inMemoryShipmentRepository.items.push(newShipment)
    }

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
      pageNumber: 1,
      itemsPerPage: 20,
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.shipments).toHaveLength(2)
    }
  })
})
