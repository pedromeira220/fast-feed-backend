import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AdministratorProps {
  name: string
  cpf: string
}

export class Administrator extends Entity<AdministratorProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  static create(props: AdministratorProps, id?: UniqueEntityId) {
    const administrator = new Administrator(
      {
        ...props,
      },
      id,
    )

    return administrator
  }
}
