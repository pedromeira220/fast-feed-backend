import request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create DeliveryPerson (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = moduleRef.get(PrismaService)

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /delivery-persons', async () => {
    const response = await request(app.getHttpServer())
      .post('/delivery-persons')
      .send({
        name: 'John Doe',
        cpf: '123.456.789-10',
      })

    expect(response.statusCode).toBe(201)

    const deliveryPersonOnDatabase = await prisma.deliveryPerson.findFirst({
      where: {
        name: 'John Doe',
      },
    })

    expect(deliveryPersonOnDatabase).toBeTruthy()
  })
})
