import { Either, failure, success } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { RecipientNotFoundError } from './errors/recipient-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteRecipientUseCaseRequest {
  recipientId: string
}

type DeleteRecipientUseCaseResponse = Either<RecipientNotFoundError, null>

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(
      new UniqueEntityId(recipientId),
    )

    if (!recipient) {
      return failure(new RecipientNotFoundError())
    }

    await this.recipientRepository.deleteById(recipient.id)

    return success(null)
  }
}
