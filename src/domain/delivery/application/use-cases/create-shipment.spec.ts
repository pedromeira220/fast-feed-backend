import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { CreateShipmentUseCase } from './create-shipment'
import { InMemoryRecipientRepository } from '@test/repositories/in-memory-recipient-repository'
import { makeRecipient } from '@test/factories/make-recipient'
import { makeAddress } from '@test/factories/make-address'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: CreateShipmentUseCase

describe('Creation shipment', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new CreateShipmentUseCase(
      inMemoryShipmentRepository,
      inMemoryRecipientRepository,
    )
  })

  it('should be able to create a shipment', async () => {
    const recipient = makeRecipient()

    inMemoryRecipientRepository.items.push(recipient)

    const address = makeAddress()

    const result = await sut.execute({
      name: 'Shipment 1',
      recipientId: recipient.id.toString(),
      address: {
        city: address.city,
        complement: address.complement,
        country: address.country,
        district: address.district,
        latitude: address.coordinate.latitude,
        longitude: address.coordinate.longitude,
        number: address.number,
        state: address.state,
        street: address.street,
        zipCode: address.zipCode,
      },
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryShipmentRepository.items).toHaveLength(1)
    expect(inMemoryShipmentRepository.items[0].name).toBe('Shipment 1')
  })
})
