import { InMemoryDeliveryPersonRepository } from '@test/repositories/in-memory-delivery-person-repository'
import { GetDeliveryPersonUseCase } from './get-delivery-person'
import { makeDeliveryPerson } from '@test/factories/make-deliver-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: GetDeliveryPersonUseCase

describe('Get delivery person by id', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    sut = new GetDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to get a delivery person by id', async () => {
    const newDeliveryPerson = makeDeliveryPerson()

    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.deliveryPerson.name).toBe(newDeliveryPerson.name)
    }
  })
})
