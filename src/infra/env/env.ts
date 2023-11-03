import { z } from 'zod'

export const envSchema = z.object({
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DB: z.string(),
  DB_PORT: z.string(),

  DATABASE_URL: z.string().url(),
})

export type Env = z.infer<typeof envSchema>
