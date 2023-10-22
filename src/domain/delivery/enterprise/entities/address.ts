import { Optional } from '@/core/types/optional'
import { Coordinate } from './value-objects/coordinate'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AddressProps {
  coordinate: Coordinate
  street: string
  district: string
  city: string
  number: string
  complement: string | null
  state: string
  country: string
  zipCode: string
}

export class Address extends Entity<AddressProps> {
  get coordinate() {
    return this.props.coordinate
  }

  get street() {
    return this.props.street
  }

  get district() {
    return this.props.district
  }

  get city() {
    return this.props.city
  }

  get number() {
    return this.props.number
  }

  get complement() {
    return this.props.complement
  }

  get state() {
    return this.props.state
  }

  get country() {
    return this.props.country
  }

  get zipCode() {
    return this.props.zipCode
  }

  static create(
    props: Optional<AddressProps, 'complement'>,
    id?: UniqueEntityId,
  ) {
    const address = new Address(
      {
        ...props,
        complement: props.complement ?? null,
      },
      id,
    )

    return address
  }
}
