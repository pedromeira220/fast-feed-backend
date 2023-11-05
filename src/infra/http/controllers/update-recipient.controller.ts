import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const updateRecipientBodySchema = z.object({
  name: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateRecipientBodySchema)

type UpdateRecipientBodySchema = z.infer<typeof updateRecipientBodySchema>

@Controller('recipients/:recipientId')
export class UpdateRecipientController {
  constructor(private updateRecipient: UpdateRecipientUseCase) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: UpdateRecipientBodySchema,
    @Param('recipientId', new ParseUUIDPipe()) recipientId: string,
  ) {
    const { name } = body

    const result = await this.updateRecipient.execute({
      recipientId,
      name,
    })

    if (result.isFailure()) {
      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
