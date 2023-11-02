import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>
  abstract findById(
    notificationId: UniqueEntityId,
  ): Promise<Notification | null>

  abstract save(notification: Notification): Promise<void>
}
