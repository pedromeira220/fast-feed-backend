import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { makeShipment } from '@test/factories/make-shipment'
import { ShipmentStatus } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { MarkShipmentAsReturnedUseCase } from './mark-shipment-as-returned'
import { CannotMarkShipmentAsReturnedThatWasNotPickedUp } from './errors/cannot-mark-shipment-as-returned-that-was-not-picked-up'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let sut: MarkShipmentAsReturnedUseCase

describe('Mark shipment as returned', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()

    sut = new MarkShipmentAsReturnedUseCase(inMemoryShipmentRepository)
  })

  it('should be able to mark a shipment as returned', async () => {
    const newDeliveryPersonId = new UniqueEntityId()

    const previousCreatedShipment = makeShipment({
      deliveryPersonId: newDeliveryPersonId,
      status: ShipmentStatus.PICKED_UP,
    })
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPersonId.toString(),
      shipmentId: previousCreatedShipment.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items).toHaveLength(1)
    expect(inMemoryShipmentRepository.items[0].status).toBe(
      ShipmentStatus.RETURNED,
    )
    expect(inMemoryShipmentRepository.items[0].returnDate).toBeInstanceOf(Date)
  })

  it('should not be able to mark a shipment as returned that does not exists', async () => {
    const result = await sut.execute({
      deliveryPersonId: new UniqueEntityId().toString(),
      shipmentId: 'fake-shipment-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })

  it('should be not able to mark a shipment as returned that does not was picked by same delivery person who is trying execute this action', async () => {
    const newDeliveryPersonId = new UniqueEntityId()

    const previousCreatedShipment = makeShipment({
      deliveryPersonId: newDeliveryPersonId,
    })
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const result = await sut.execute({
      deliveryPersonId: 'fake-id',
      shipmentId: previousCreatedShipment.id.toString(),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  it('should not be able to mark a shipment as returned that does not exists', async () => {
    const result = await sut.execute({
      deliveryPersonId: new UniqueEntityId().toString(),
      shipmentId: 'fake-shipment-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })

  it('should not be able to mark a shipment as returned that was not picked up', async () => {
    const newDeliveryPersonId = new UniqueEntityId()

    const previousCreatedShipment = makeShipment({
      status: ShipmentStatus.WAITING,
      deliveryPersonId: newDeliveryPersonId,
    })
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPersonId.toString(),
      shipmentId: previousCreatedShipment.id.toString(),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(
      CannotMarkShipmentAsReturnedThatWasNotPickedUp,
    )
  })
})
