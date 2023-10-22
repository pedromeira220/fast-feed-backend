import { InMemoryDeliveryPersonRepository } from '@test/repositories/in-memory-delivery-person-repository'
import { DeleteDeliveryPersonUseCase } from './delete-delivery-person'
import { makeDeliveryPerson } from '@test/factories/make-deliver-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: DeleteDeliveryPersonUseCase

describe('Delete delivery person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    sut = new DeleteDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to delete a delivery person', async () => {
    const newDeliveryPerson = makeDeliveryPerson()

    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryDeliveryPersonRepository.items).toHaveLength(0)
  })
})
