'use server'

import { Steps } from '@/hooks/use-steps'
import { lingos } from '@/lib/storage/local'
import { cookies } from 'next/headers'

type AddAuthCookiesData = {
  steps: Steps
}

export const addAuthCookies = async (
  data: AddAuthCookiesData,
): Promise<void> => {
  Object.entries(data).forEach(([key, value]) => {
    cookies().set(`${lingos.prefixKey(`auth:${key}`)}`, JSON.stringify(value))
  })
}
