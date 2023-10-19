import { makeRecipient } from '@test/factories/make-recipient'
import { InMemoryRecipientRepository } from '@test/repositories/in-memory-recipient-repository'
import { GetRecipientByIdUseCase } from './get-recipient-by-id'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: GetRecipientByIdUseCase

describe('Get recipient by id', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new GetRecipientByIdUseCase(inMemoryRecipientRepository)
  })

  it('should be able to get a recipient by id', async () => {
    const newRecipient = makeRecipient()

    inMemoryRecipientRepository.items.push(newRecipient)

    const result = await sut.execute({
      recipientId: newRecipient.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.recipient.name).toBe(newRecipient.name)
    }
  })
})
