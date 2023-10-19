import { InMemoryRecipientRepository } from '../../../../../test/repositories/in-memory-recipient-repository'
import { CreateRecipientUseCase } from './create-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: CreateRecipientUseCase

describe('Creation recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to create a recipient', async () => {
    const result = await sut.execute({
      name: 'John Doe',
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value?.recipient.name).toBe('John Doe')
  })
})
