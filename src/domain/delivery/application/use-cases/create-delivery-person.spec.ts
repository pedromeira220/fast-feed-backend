import { InMemoryDeliveryPersonRepository } from '../../../../../test/repositories/in-memory-delivery-person-respository'
import { CreateDeliveryPersonUseCase } from './create-delivery-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: CreateDeliveryPersonUseCase

describe('Creation delivery person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    sut = new CreateDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to create an delivery person', async () => {
    const result = await sut.execute({
      cpf: '123.456.789-01',
      name: 'John Doe',
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value?.deliveryPerson.name).toBe('John Doe')
  })
})
