import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { RecipientFactory } from '@test/factories/make-recipient'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get recipient (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory],
    }).compile()

    recipientFactory = moduleRef.get(RecipientFactory)

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[GET] /recipients/:id', async () => {
    const recipient = await recipientFactory.makePrismaRecipient({})

    const response = await request(app.getHttpServer()).get(
      `/recipients/${recipient.id.toString()}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body.recipient.id).toBe(recipient.id.toString())
  })
})
