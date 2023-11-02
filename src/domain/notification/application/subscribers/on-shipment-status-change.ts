import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { ShipmentStatusChangeEvent } from '@/domain/delivery/enterprise/events/shipment-status-change-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnShipmentStatusChange implements EventHandler {
  constructor(private sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNotificationOnShipmentChangeStatus.bind(this),
      ShipmentStatusChangeEvent.name,
    )
  }

  private async sendNotificationOnShipmentChangeStatus(
    event: ShipmentStatusChangeEvent,
  ) {
    await this.sendNotification.execute({
      title: `Novo status de encomenda: ${event.shipment.name}`,
      content: `A encomenda "${
        event.shipment.name
      } com id (${event.shipment.id.toString()}) mudou seu status de "${
        event.previousStatus
      }" para "${event.currentStatus}"`,
      recipientId: event.shipment.recipientId.toString(),
    })
  }
}
