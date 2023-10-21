import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { makeShipment } from '@test/factories/make-shipment'
import { ShipmentStatus } from '../../enterprise/entities/shipment'
import { PickUpShipmentUseCase } from './pick-up-shipment'
import { makeDeliveryPerson } from '@test/factories/make-deliver-person'
import { InMemoryDeliveryPersonRepository } from '@test/repositories/in-memory-delivery-person-respository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentCannotBePickedUpDueStatusError } from './errors/shipment-cannot-be-picked-up-due-status-error'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: PickUpShipmentUseCase

describe('Pick up shipment', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new PickUpShipmentUseCase(
      inMemoryShipmentRepository,
      inMemoryDeliveryPersonRepository,
    )
  })

  it('should be able to pick up a shipment', async () => {
    const previousCreatedShipment = makeShipment({
      status: ShipmentStatus.WAITING,
    })
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const deliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      shipmentId: previousCreatedShipment.id.toString(),
      deliveryPersonId: deliveryPerson.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items).toHaveLength(1)

    expect(inMemoryShipmentRepository.items[0].pickupDate).toBeInstanceOf(Date)
    expect(inMemoryShipmentRepository.items[0].deliveryPersonId).toBeInstanceOf(
      UniqueEntityId,
    )
  })

  it('should not be able to pick up a shipment that status is not "waiting"', async () => {
    const previousCreatedShipment = makeShipment()
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const deliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(deliveryPerson)

    const result = await sut.execute({
      shipmentId: previousCreatedShipment.id.toString(),
      deliveryPersonId: deliveryPerson.id.toString(),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentCannotBePickedUpDueStatusError)
    expect(inMemoryShipmentRepository.items).toHaveLength(1)

    expect(inMemoryShipmentRepository.items[0].pickupDate).toBe(null)
    expect(inMemoryShipmentRepository.items[0].deliveryPersonId).toBe(null)
  })
})
