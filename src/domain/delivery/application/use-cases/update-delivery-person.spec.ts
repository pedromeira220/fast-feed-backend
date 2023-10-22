import { InMemoryDeliveryPersonRepository } from '@test/repositories/in-memory-delivery-person-repository'
import { UpdateDeliveryPersonUseCase } from './update-delivery-person'
import { makeDeliveryPerson } from '@test/factories/make-deliver-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: UpdateDeliveryPersonUseCase

describe('Update delivery person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    sut = new UpdateDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to update a delivery person ', async () => {
    const newDeliveryPerson = makeDeliveryPerson()

    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
      cpf: '123.456.789.01',
      name: 'New name',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryDeliveryPersonRepository.items[0].name).toBe('New name')
    expect(inMemoryDeliveryPersonRepository.items[0].cpf).toBe('123.456.789.01')
  })
})
