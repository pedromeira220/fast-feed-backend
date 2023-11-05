import { Either, failure, success } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface UpdateRecipientUseCaseRequest {
  recipientId: string
  name?: string
}

type UpdateRecipientUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
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

    if (name !== undefined) recipient.name = name

    await this.recipientRepository.save(recipient)

    return success(null)
  }
}
