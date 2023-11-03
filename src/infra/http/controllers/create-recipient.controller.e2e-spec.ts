import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create recipient (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    prisma = moduleRef.get(PrismaService)

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /recipients', async () => {
    const response = await request(app.getHttpServer())
      .post('/recipients')
      .send({
        name: 'John Doe',
      })

    expect(response.statusCode).toBe(201)

    const recipientOnDatabase = await prisma.recipient.findFirst({
      where: {
        name: 'John Doe',
      },
    })

    expect(recipientOnDatabase).toBeTruthy()
  })
})
