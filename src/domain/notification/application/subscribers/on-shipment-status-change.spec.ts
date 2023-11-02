import { ShipmentStatus } from '@/domain/delivery/enterprise/entities/shipment'
import { makeShipment } from '@test/factories/make-shipment'
import { InMemoryShipmentRepository } from '@test/repositories/in-memory-shipment-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { SpyInstance } from 'vitest'
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { waitFor } from '@test/utils/wait-for'
import { OnShipmentStatusChange } from './on-shipment-status-change'

let inMemoryShipmentRepository: InMemoryShipmentRepository
let sendNotificationUseCase: SendNotificationUseCase

let inMemoryNotificationRepository: InMemoryNotificationRepository

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On shipment status change', () => {
  beforeEach(() => {
    inMemoryShipmentRepository = new InMemoryShipmentRepository()

    inMemoryNotificationRepository = new InMemoryNotificationRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnShipmentStatusChange(sendNotificationUseCase)
  })

  it('should be able to send a notification when a shipment status is changed', async () => {
    const shipment = makeShipment({
      status: ShipmentStatus.PICKED_UP,
    })

    await inMemoryShipmentRepository.create(shipment)

    shipment.status = ShipmentStatus.DELIVERED

    await inMemoryShipmentRepository.save(shipment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
