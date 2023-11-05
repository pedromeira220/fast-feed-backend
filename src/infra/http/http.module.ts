import { Module } from '@nestjs/common'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'
import { DatabaseModule } from '../database/database.module'
import { GetRecipientController } from './controllers/get-recipient.controller'
import { GetRecipientByIdUseCase } from '@/domain/delivery/application/use-cases/get-recipient-by-id'
import { DeleteRecipientController } from './controllers/delete-recipient.controller'
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient'
import { UpdateRecipientController } from './controllers/update-recipient.controller'
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateRecipientController,
    GetRecipientController,
    DeleteRecipientController,
    UpdateRecipientController,
  ],
  providers: [
    CreateRecipientUseCase,
    GetRecipientByIdUseCase,
    DeleteRecipientUseCase,
    UpdateRecipientUseCase,
  ],
})
export class HttpModule {}
