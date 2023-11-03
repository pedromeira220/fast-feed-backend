import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import { RecipientPresenter } from '../presenter/recipient-presenter'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const createRecipientBodySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createRecipientBodySchema)

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@Controller('recipients')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipientUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateRecipientBodySchema) {
    const { name } = body

    const result = await this.createRecipient.execute({
      name,
    })

    if (result.isFailure()) {
      throw new InternalServerErrorException()
    }

    return RecipientPresenter.toHttp(result.value.recipient)
  }
}
