import { DeliveryPersonRepository } from '@/domain/delivery/application/repositories/delivery-person-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'
import { PrismaDeliveryPersonMapper } from '../mappers/delivery-person-mapper'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

@Injectable()
export class PrismaDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  constructor(private prisma: PrismaService) {}

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    const data = PrismaDeliveryPersonMapper.toPrisma(deliveryPerson)

    await this.prisma.deliveryPerson.create({
      data,
    })
  }

  async findById(
    deliveryPersonId: UniqueEntityId,
  ): Promise<DeliveryPerson | null> {
    const deliveryPersonFound = await this.prisma.deliveryPerson.findUnique({
      where: {
        id: deliveryPersonId.toString(),
      },
    })

    if (!deliveryPersonFound) {
      return null
    }

    return PrismaDeliveryPersonMapper.toDomain(deliveryPersonFound)
  }

  async deleteById(deliveryPersonId: UniqueEntityId): Promise<void> {
    await this.prisma.deliveryPerson.delete({
      where: {
        id: deliveryPersonId.toString(),
      },
    })
  }

  async save(deliveryPerson: DeliveryPerson): Promise<void> {
    await this.prisma.deliveryPerson.update({
      where: {
        id: deliveryPerson.id.toString(),
      },
      data: PrismaDeliveryPersonMapper.toPrisma(deliveryPerson),
    })
  }
}
