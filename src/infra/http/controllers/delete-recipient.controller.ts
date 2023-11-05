import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient'
import { RecipientNotFoundError } from '@/domain/delivery/application/use-cases/errors/recipient-not-found-error'

@Controller('recipients')
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientUseCase) {}

  @Delete('/:recipientId')
  async handle(@Param('recipientId', new ParseUUIDPipe()) recipientId: string) {
    const result = await this.deleteRecipient.execute({
      recipientId,
    })

    if (result.isFailure()) {
      switch (result.value.constructor) {
        case RecipientNotFoundError:
          throw new NotFoundException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
