import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'
import { Prisma, DeliveryPerson as PrismaDeliveryPerson } from '@prisma/client'

export class PrismaDeliveryPersonMapper {
  static toPrisma(
    deliveryPerson: DeliveryPerson,
  ): Prisma.DeliveryPersonUncheckedCreateInput {
    return {
      name: deliveryPerson.name,
      id: deliveryPerson.id.toString(),
      cpf: deliveryPerson.cpf,
    }
  }

  static toDomain(deliveryPerson: PrismaDeliveryPerson): DeliveryPerson {
    return DeliveryPerson.create(
      {
        name: deliveryPerson.name,
        cpf: deliveryPerson.cpf,
      },
      new UniqueEntityId(deliveryPerson.id),
    )
  }
}
