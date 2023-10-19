import { Either, failure, success } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateRecipientUseCaseRequest {
  recipientId: string
  name: string
}

type UpdateRecipientUseCaseResponse = Either<ResourceNotFoundError, null>

export class UpdateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
    name,
  }: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(
      new UniqueEntityId(recipientId),
    )

    if (!recipient) {
      return failure(new ResourceNotFoundError())
    }

    recipient.name = name

    await this.recipientRepository.save(recipient)

    return success(null)
  }
}
