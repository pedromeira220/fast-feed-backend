import { Either, failure, success } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'

interface GetRecipientByIdUseCaseRequest {
  recipientId: string
}

type GetRecipientByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

export class GetRecipientByIdUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
  }: GetRecipientByIdUseCaseRequest): Promise<GetRecipientByIdUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(
      new UniqueEntityId(recipientId),
    )

    if (!recipient) {
      return failure(new ResourceNotFoundError())
    }

    return success({ recipient })
  }
}
