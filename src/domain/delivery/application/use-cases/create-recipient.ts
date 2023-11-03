import { Either, success } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-repository'
import { Injectable } from '@nestjs/common'

interface CreateRecipientUseCaseRequest {
  name: string
}

type CreateRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient
  }
>
@Injectable()
export class CreateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    name,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
    })

    await this.recipientRepository.create(recipient)

    return success({
      recipient,
    })
  }
}
