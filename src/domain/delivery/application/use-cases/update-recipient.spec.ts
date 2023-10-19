import { makeRecipient } from '@test/factories/make-recipient'
import { InMemoryRecipientRepository } from '@test/repositories/in-memory-recipient-repository'
import { UpdateRecipientUseCase } from './update-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: UpdateRecipientUseCase

describe('Update recipient by id', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new UpdateRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to update a recipient ', async () => {
    const newRecipient = makeRecipient()

    inMemoryRecipientRepository.items.push(newRecipient)

    const result = await sut.execute({
      recipientId: newRecipient.id.toString(),
      name: 'New name',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryRecipientRepository.items[0].name).toBe('New name')
  })
})
