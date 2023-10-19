import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface DeliveryPersonProps {
  name: string
  cpf: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  static create(props: DeliveryPersonProps, id?: UniqueEntityId) {
    const deliveryPerson = new DeliveryPerson(
      {
        ...props,
      },
      id,
    )

    return deliveryPerson
  }
}
