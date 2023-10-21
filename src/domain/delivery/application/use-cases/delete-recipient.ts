import { Either, failure, success } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface DeleteRecipientUseCaseRequest {
  recipientId: string
}

type DeleteRecipientUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(
      new UniqueEntityId(recipientId),
    )

    if (!recipient) {
      return failure(new ResourceNotFoundError())
    }

    await this.recipientRepository.deleteById(recipient.id)

    return success(null)
  }
}
