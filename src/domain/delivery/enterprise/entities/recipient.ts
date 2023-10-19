import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  static create(props: RecipientProps, id?: UniqueEntityId) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}
