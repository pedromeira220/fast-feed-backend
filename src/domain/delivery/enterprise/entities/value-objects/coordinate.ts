interface CoordinateProps {
  latitude: number
  longitude: number
}

export class Coordinate implements CoordinateProps {
  private _latitude: number
  private _longitude: number

  get latitude() {
    return this._latitude
  }

  get longitude() {
    return this._longitude
  }

  toArray() {
    return [this._latitude, this._longitude]
  }

  static create(props: CoordinateProps) {
    const coordinate = new Coordinate(props)

    return coordinate
  }

  static createFromArray([latitude, longitude]: [number, number]) {
    return new Coordinate({
      latitude,
      longitude,
    })
  }

  private constructor(props: CoordinateProps) {
    this._latitude = props.latitude
    this._longitude = props.longitude
  }
}
