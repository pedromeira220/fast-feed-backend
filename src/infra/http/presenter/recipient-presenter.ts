import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class RecipientPresenter {
  static toHttp(recipient: Recipient) {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
    }
  }
}
