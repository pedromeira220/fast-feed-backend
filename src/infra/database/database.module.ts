import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { DeliveryPersonRepository } from '@/domain/delivery/application/repositories/delivery-person-repository'
import { PrismaDeliveryPersonRepository } from './prisma/repositories/prisma-delivery-person-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository,
    },
    {
      provide: DeliveryPersonRepository,
      useClass: PrismaDeliveryPersonRepository,
    },
  ],
  exports: [PrismaService, RecipientRepository, DeliveryPersonRepository],
})
export class DatabaseModule {}
