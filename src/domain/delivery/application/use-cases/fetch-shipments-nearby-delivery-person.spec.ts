import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import { InMemoryDeliveryPersonRepository } from '@test/repositories/in-memory-delivery-person-repository'
import { makeShipment } from '@test/factories/make-shipment'
import { makeDeliveryPerson } from '@test/factories/make-deliver-person'
import { makeAddress } from '@test/factories/make-address'
import { Coordinate } from '../../enterprise/entities/value-objects/coordinate'
import { faker } from '@faker-js/faker'
import { FetchShipmentsNearbyDeliveryPersonUseCase } from './fetch-shipments-nearby-delivery-person'
import { ShipmentStatus } from '../../enterprise/entities/shipment'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: FetchShipmentsNearbyDeliveryPersonUseCase

describe('Fetch shipments nearby delivery person', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new FetchShipmentsNearbyDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      inMemoryShipmentRepository,
    )
  })

  it('should be able to fetch shipments nearby a delivery person', async () => {
    const newDeliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const shipmentDeliveryAddress = makeAddress()

    const newShipment = makeShipment({
      deliveryPersonId: newDeliveryPerson.id,
      deliveryAddress: shipmentDeliveryAddress,
      status: ShipmentStatus.WAITING,
    })
    inMemoryShipmentRepository.items.push(newShipment)

    const nearbyCoordinate = Coordinate.createFromArray(
      faker.location.nearbyGPSCoordinate({
        origin: [
          shipmentDeliveryAddress.coordinate.latitude,
          shipmentDeliveryAddress.coordinate.longitude,
        ],
        isMetric: true,
        radius: 10, // 10km
      }),
    )

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
      deliveryPersonLatitude: nearbyCoordinate.latitude,
      deliveryPersonLongitude: nearbyCoordinate.longitude,
      pageNumber: 0,
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.shipments).toHaveLength(1)
      expect(result.value.shipments[0].name).toBe(newShipment.name)
    }
  })

  it('should be able to fetch shipments paginated', async () => {
    const newDeliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const shipmentDeliveryAddress = makeAddress()

    for (let i = 0; i < 22; i++) {
      const randomNumber = Math.round(Math.random() * 10)

      const newShipment = makeShipment({
        deliveryPersonId: newDeliveryPerson.id,
        deliveryAddress: shipmentDeliveryAddress,
        status:
          randomNumber % 2 === 0
            ? ShipmentStatus.WAITING
            : ShipmentStatus.PICKED_UP,
      })
      inMemoryShipmentRepository.items.push(newShipment)
    }

    const nearbyCoordinate = Coordinate.createFromArray(
      faker.location.nearbyGPSCoordinate({
        origin: [
          shipmentDeliveryAddress.coordinate.latitude,
          shipmentDeliveryAddress.coordinate.longitude,
        ],
        isMetric: true,
        radius: 10,
      }),
    )

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
      deliveryPersonLatitude: nearbyCoordinate.latitude,
      deliveryPersonLongitude: nearbyCoordinate.longitude,
      pageNumber: 1,
      itemsPerPage: 20,
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.shipments).toHaveLength(2)
    }
  })

  it('should not be able to fetch distant shipments', async () => {
    const newDeliveryPerson = makeDeliveryPerson()
    inMemoryDeliveryPersonRepository.items.push(newDeliveryPerson)

    const shipmentDeliveryAddress = makeAddress()

    const newShipment = makeShipment({
      deliveryPersonId: newDeliveryPerson.id,
      deliveryAddress: shipmentDeliveryAddress,
      status: ShipmentStatus.WAITING,
    })
    inMemoryShipmentRepository.items.push(newShipment)

    const distantCoordinate = Coordinate.create({
      latitude: shipmentDeliveryAddress.coordinate.latitude + 100,
      longitude: shipmentDeliveryAddress.coordinate.longitude + 100,
    })

    const result = await sut.execute({
      deliveryPersonId: newDeliveryPerson.id.toString(),
      deliveryPersonLatitude: distantCoordinate.latitude,
      deliveryPersonLongitude: distantCoordinate.longitude,
      pageNumber: 0,
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.shipments).toHaveLength(0)
    }
  })
})
