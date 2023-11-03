import { Module } from '@nestjs/common'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateRecipientController],
  providers: [CreateRecipientUseCase],
})
export class HttpModule {}
