import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { RecipientFactory } from '@test/factories/make-recipient'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Update recipient (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory],
    }).compile()

    recipientFactory = moduleRef.get(RecipientFactory)
    prisma = moduleRef.get(PrismaService)

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[PUT] /recipients/:id', async () => {
    const recipient = await recipientFactory.makePrismaRecipient({
      name: 'Recipient 1',
    })

    const response = await request(app.getHttpServer())
      .put(`/recipients/${recipient.id.toString()}`)
      .send({
        name: 'Updated recipient name',
      })

    expect(response.statusCode).toBe(200)

    const recipientFound = await prisma.recipient.findFirst({
      where: {
        id: recipient.id.toString(),
      },
    })

    expect(recipientFound?.name).toBe('Updated recipient name')
  })
})
