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

  set name(value: string) {
    this.props.name = value
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(value: string) {
    this.props.cpf = value
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
