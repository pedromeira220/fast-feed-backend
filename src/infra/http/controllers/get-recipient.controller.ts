import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { RecipientPresenter } from '../presenter/recipient-presenter'
import { GetRecipientByIdUseCase } from '@/domain/delivery/application/use-cases/get-recipient-by-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

@Controller('recipients')
export class GetRecipientController {
  constructor(private getRecipient: GetRecipientByIdUseCase) {}

  @Get('/:recipientId')
  async handle(@Param('recipientId', new ParseUUIDPipe()) recipientId: string) {
    const result = await this.getRecipient.execute({
      recipientId,
    })

    if (result.isFailure()) {
      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }

    return {
      recipient: RecipientPresenter.toHttp(result.value.recipient),
    }
  }
}
