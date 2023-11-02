import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(notificationId: UniqueEntityId): Promise<Notification | null> {
    const notificationFound = this.items.find((notification) =>
      notification.id.equals(notificationId),
    )

    if (!notificationFound) {
      return null
    }

    return notificationFound
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex((notification) =>
      notification.id.equals(notification.id),
    )

    this.items[itemIndex] = notification
  }
}
