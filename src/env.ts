import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

export const env = createEnv({
  server: {
    ABLY_API_KEY: z.string().min(1),
    USER_FULLNAME: z.string().min(1),
    USER_EMAIL: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    OPENAI_PROMPT: z.string().min(1),
    OPENAI_MODEL: z.string().min(1),

    SERPER_API_KEY: z.string().min(1),

    DRIZZLE_DATABASE_URL: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),

    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    CLOUDFLARE_BUCKET_NAME: z.string().min(1),
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_SECRET_KEY: z.string().min(1),
    CLOUDFLARE_ACCESS_KEY: z.string().min(1),
    GOOGLE_ANALYTICS_MEASUREMENT_Id: z.string().min(1),
    CLOUDFLARE_TOKEN_API: z.string().min(1),
    TYPEBOT_BOT_KEY: z.string().min(1),
    TYPEBOT_BOT_URL: z.string().min(1),
    RECAPTCHA_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_AZURE_SPEECH_SUBSCRITION_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_AZURE_SPEECH_REGION: z.string().min(1),
    NEXT_PUBLIC_AZURE_SPEECH_LANGUAGE: z.string().min(1),
    NEXT_PUBLIC_EXPIRE_AT: z
      .string()
      .min(1)
      .transform((expireAt) => new Date(expireAt)),
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA_KEY: z.string().min(1),
    NEXT_PUBLIC_COUPON: z.string().min(1),
    NEXT_PUBLIC_DISCOUNT: z
      .string()
      .min(1)
      .refine((value) => {
        const { data: valueAsNum, success } = z
          .number()
          .safeParse(Number(value))

        if (!success) return success

        if (valueAsNum < 0 || valueAsNum > 100) {
          return false
        }

        return success
      })
      .transform(Number),
    NEXT_PUBLIC_RECAPTCHA_ENABLE: z
      .string()
      .regex(/true|false/)
      .transform((v) => v === 'true' && process.env.NODE_ENV === 'production'),
    NEXT_PUBLIC_TRIAL_PERIOD_DAYS: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) || 0 : undefined)),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_AZURE_SPEECH_LANGUAGE:
      process.env.NEXT_PUBLIC_AZURE_SPEECH_LANGUAGE,
    NEXT_PUBLIC_COUPON: process.env.NEXT_PUBLIC_COUPON,
    NEXT_PUBLIC_TRIAL_PERIOD_DAYS: process.env.NEXT_PUBLIC_TRIAL_PERIOD_DAYS,
    NEXT_PUBLIC_DISCOUNT: process.env.NEXT_PUBLIC_DISCOUNT,
    NEXT_PUBLIC_EXPIRE_AT: process.env.NEXT_PUBLIC_EXPIRE_AT,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_RECAPTCHA_ENABLE: process.env.NEXT_PUBLIC_RECAPTCHA_ENABLE,
    NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_AZURE_SPEECH_REGION:
      process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION,
    NEXT_PUBLIC_AZURE_SPEECH_SUBSCRITION_KEY:
      process.env.NEXT_PUBLIC_AZURE_SPEECH_SUBSCRITION_KEY,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
})
