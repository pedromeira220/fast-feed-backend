import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { makeShipment } from '@test/factories/make-shipment'
import { ShipmentStatus } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { MarkShipmentAsDeliveredUseCase } from './mark-shipment-as-delivered'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryPhotoRepository } from '@test/repositories/in-memory-photo-repository'
import { makePhoto } from '@test/factories/make-photo'
import { DeliveryConfirmationPhoto } from '../../enterprise/entities/delivery-confirmation-photo'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let inMemoryPhotoRepository: InMemoryPhotoRepository
let sut: MarkShipmentAsDeliveredUseCase

describe('Mark shipment as delivered', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    inMemoryPhotoRepository = new InMemoryPhotoRepository()

    sut = new MarkShipmentAsDeliveredUseCase(
      inMemoryShipmentRepository,
      inMemoryPhotoRepository,
    )
  })

  it('should be able to mark a shipment as delivered', async () => {
    const newDeliveryPersonId = new UniqueEntityId()

    const previousCreatedShipment = makeShipment({
      deliveryPersonId: newDeliveryPersonId,
    })
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const previousCreatedPhoto = makePhoto()
    inMemoryPhotoRepository.items.push(previousCreatedPhoto)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPersonId.toString(),
      shipmentId: previousCreatedShipment.id.toString(),
      photoId: previousCreatedPhoto.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items).toHaveLength(1)
    expect(inMemoryShipmentRepository.items[0].status).toBe(
      ShipmentStatus.DELIVERED,
    )
    expect(inMemoryShipmentRepository.items[0].deliveryDate).toBeInstanceOf(
      Date,
    )
    expect(
      inMemoryShipmentRepository.items[0].deliveryConfirmationPhoto,
    ).toBeInstanceOf(DeliveryConfirmationPhoto)
  })

  it('should not be able to mark a shipment as delivered that does not exists', async () => {
    const result = await sut.execute({
      deliveryPersonId: new UniqueEntityId().toString(),
      shipmentId: 'fake-shipment-id',
      photoId: 'fake-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })

  it('should be not able to mark a shipment as delivered that does not was picked by same delivery person who is trying to delivery it', async () => {
    const newDeliveryPersonId = new UniqueEntityId()

    const previousCreatedShipment = makeShipment({
      deliveryPersonId: newDeliveryPersonId,
    })
    inMemoryShipmentRepository.items.push(previousCreatedShipment)

    const result = await sut.execute({
      deliveryPersonId: 'fake-id',
      shipmentId: previousCreatedShipment.id.toString(),
      photoId: new UniqueEntityId().toString(),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
