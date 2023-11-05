import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateDeliveryPersonUseCase } from '@/domain/delivery/application/use-cases/create-delivery-person'
import { DeliveryPersonPresenter } from '../presenter/delivery-person-presenter'

const createDeliveryPersonBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createDeliveryPersonBodySchema)

type CreateDeliveryPersonBodySchema = z.infer<
  typeof createDeliveryPersonBodySchema
>

@Controller('delivery-persons')
export class CreateDeliveryPersonController {
  constructor(private createDeliveryPerson: CreateDeliveryPersonUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateDeliveryPersonBodySchema) {
    const { name, cpf } = body

    const result = await this.createDeliveryPerson.execute({
      cpf,
      name,
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }

    return {
      deliveryPerson: DeliveryPersonPresenter.toHttp(
        result.value.deliveryPerson,
      ),
    }
  }
}
