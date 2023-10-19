import { makeRecipient } from '@test/factories/make-recipient'
import { DeleteRecipientUseCase } from './delete-recipient'
import { InMemoryRecipientRepository } from '@test/repositories/in-memory-recipient-repository'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: DeleteRecipientUseCase

describe('Delete recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new DeleteRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to delete a recipient', async () => {
    const newRecipient = makeRecipient()

    inMemoryRecipientRepository.items.push(newRecipient)

    const result = await sut.execute({
      recipientId: newRecipient.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryRecipientRepository.items).toHaveLength(0)
  })
})
