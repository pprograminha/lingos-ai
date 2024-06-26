'use server'

import { withAuth } from '@/lib/auth/get-auth'
import { db } from '@/lib/db/drizzle/query'
import {
  conversations,
  pronunciationsAssessment,
} from '@/lib/db/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function deleteConversation(convesationId: string): Promise<void> {
  return (
    await withAuth(async () => {
      await db
        .delete(pronunciationsAssessment)
        .where(eq(pronunciationsAssessment.conversationId, convesationId))
      await db.delete(conversations).where(eq(conversations.id, convesationId))
    })
  )()
}
