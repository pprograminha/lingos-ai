import { relations } from 'drizzle-orm'
import {
  bigint,
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('role', ['superadmin', 'admin', 'user'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  fullName: text('fullName').notNull(),
  email: text('email').notNull().unique(),
  image: text('image').unique(),
  googleId: text('googleId').unique(),
  locale: text('locale').notNull().default('pt'),
  billingAddress: jsonb('billingAddress'),
  paymentMethod: jsonb('paymentMethod'),
  role: userRoleEnum('role').default('user').notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const customers = pgTable('customers', {
  id: uuid('id')
    .primaryKey()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  stripeCustomerId: text('stripeCustomerId'),
})

// Products Table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  active: boolean('active'),
  name: text('name'),
  description: text('description'),
  image: text('image'),
  metadata: jsonb('metadata'),
})

export const pricesTypeEnum = pgEnum('type', ['one_time', 'recurring'])
export const pricesIntervalVariantEnum = pgEnum('intervalVariant', [
  'day',
  'week',
  'month',
  'year',
])

export const prices = pgTable('prices', {
  id: text('id').primaryKey(),
  productId: text('productId').references(() => products.id, {
    onDelete: 'cascade',
  }),
  active: boolean('active'),
  description: text('description'),
  unitAmount: bigint('unitAmount', {
    mode: 'bigint',
  }),
  currency: text('currency'),
  type: pricesTypeEnum('type'),
  intervalVariant: pricesIntervalVariantEnum('intervalVariant'),
  intervalCount: integer('intervalCount'),
  trialPeriodDays: integer('trialPeriodDays'),
  metadata: jsonb('metadata'),
})

export const subscriptionsStatusEnum = pgEnum('status', [
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused',
])

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: uuid('userId').references(() => users.id, {
    onDelete: 'cascade',
  }),
  status: subscriptionsStatusEnum('status'),
  metadata: jsonb('metadata'),
  priceId: text('priceId').references(() => prices.id, {
    onDelete: 'cascade',
  }),
  coupons: jsonb('coupons').notNull().$type<string[]>().default([]),
  quantity: integer('quantity'),
  cancelAtPeriodEnd: boolean('cancelAtPeriodEnd'),
  created: timestamp('created').defaultNow(),
  currentPeriodStart: timestamp('currentPeriodStart').defaultNow(),
  currentPeriodEnd: timestamp('currentPeriodEnd').defaultNow(),
  endedAt: timestamp('endedAt').defaultNow(),
  cancelAt: timestamp('cancelAt').defaultNow(),
  canceledAt: timestamp('canceledAt').defaultNow(),
  trialStart: timestamp('trialStart').defaultNow(),
  trialEnd: timestamp('trialEnd').defaultNow(),
})

export const couponsDurationEnum = pgEnum('duration', [
  'forever',
  'once',
  'repeating',
])

export const coupons = pgTable('coupons', {
  id: text('id').primaryKey(),
  amount_off: integer('amount_off'),
  created: integer('created').notNull(),
  currency: text('currency'),
  deleted: boolean('deleted').notNull().default(false),
  duration: couponsDurationEnum('duration').notNull(),
  duration_in_months: integer('duration_in_months'),
  livemode: boolean('livemode').notNull(),
  max_redemptions: integer('max_redemptions'),
  metadata: jsonb('metadata'),
  name: text('name'),
  percent_off: integer('percent_off'),
  redeem_by: integer('redeem_by'),
  times_redeemed: integer('times_redeemed').notNull(),
  valid: boolean('valid').notNull(),
})
export const promotionCodes = pgTable('promotionCodes', {
  id: text('id').primaryKey(),
  code: text('code'),
  coupon: text('coupon'),
  created: integer('created').notNull(),
  livemode: boolean('livemode').notNull(),
  max_redemptions: integer('max_redemptions'),
  metadata: jsonb('metadata'),
  expires_at: integer('percent_off'),
  times_redeemed: integer('times_redeemed').notNull(),
  active: boolean('active'),
})

export const usersProfile = pgTable('usersProfile', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull()
    .unique(),
  localeToLearn: text('localeToLearn').notNull().default('en'),
  communicationLevel: text('communicationLevel').notNull().default('basics'),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const usersAvailability = pgTable('usersAvailability', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull()
    .unique(),
  times: jsonb('times').array(9).notNull().$type<string[]>(),
  days: jsonb('days').array(7).notNull().$type<string[]>(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const conversationRoleEnum = pgEnum('role', [
  'assistant',
  'tool',
  'user',
])

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey(),
  text: text('text').notNull(),
  authorId: uuid('authorId').references(() => users.id, {
    onDelete: 'cascade',
  }),
  recipientId: uuid('recipientId')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  role: conversationRoleEnum('role').default('user').notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const pronunciationsAssessment = pgTable('pronunciationsAssessment', {
  id: uuid('id').primaryKey(),

  text: text('text'),
  conversationId: uuid('conversationId').references(() => conversations.id, {
    onDelete: 'set null',
  }),
  creatorId: uuid('creatorId').references(() => users.id, {
    onDelete: 'cascade',
  }),
  accuracyScore: doublePrecision('accuracyScore').notNull(),
  completenessScore: doublePrecision('completenessScore').notNull(),
  fluencyScore: doublePrecision('fluencyScore').notNull(),
  pronScore: doublePrecision('pronScore').notNull(),
  prosodyScore: doublePrecision('prosodyScore').notNull(),

  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const models = pgTable('models', {
  id: text('id').primaryKey(),
  name: text('name'),
  slug: text('slug'),
  image: text('image'),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const histories = pgTable('histories', {
  id: text('id').primaryKey(),

  userId: uuid('userId')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  modelId: text('modelId')
    .references(() => models.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const speechClientEnum = pgEnum('client', ['cloudflare-s3'])

export const speechsToConversations = pgTable(
  'speechsToConversations',
  {
    speechId: uuid('speechId')
      .references(() => speechs.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    conversationId: uuid('conversationId')
      .references(() => conversations.id, {
        onDelete: 'cascade',
      })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.speechId, t.conversationId] }),
  }),
)

export const speechs = pgTable('speechs', {
  id: uuid('id').primaryKey(),
  speech: text('speech').notNull(),
  voice: text('voice').notNull(),
  speed: doublePrecision('speed').notNull().default(1),
  client: speechClientEnum('client').default('cloudflare-s3').notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const words = pgTable('words', {
  id: uuid('id').primaryKey(),
  locale: text('locale').notNull().default('en'),
  word: text('word').notNull(),
  pronunciationAssessmentId: uuid('pronunciationAssessmentId')
    .references(() => pronunciationsAssessment.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  accuracyScore: doublePrecision('accuracyScore').notNull(),

  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const phonemes = pgTable('phonemes', {
  id: uuid('id').primaryKey(),
  phoneme: text('phoneme').notNull(),
  wordId: uuid('wordId')
    .references(() => words.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  accuracyScore: doublePrecision('accuracyScore').notNull(),

  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const historiesRelations = relations(histories, ({ one }) => ({
  user: one(users, {
    fields: [histories.userId],
    references: [users.id],
  }),
  model: one(models, {
    fields: [histories.modelId],
    references: [models.id],
  }),
}))

export const modelsRelations = relations(models, ({ many }) => ({
  histories: many(histories),
}))

export const speechsToConversationsRelations = relations(
  speechsToConversations,
  ({ one }) => ({
    speechs: one(speechs, {
      fields: [speechsToConversations.speechId],
      references: [speechs.id],
    }),
    conversations: one(conversations, {
      fields: [speechsToConversations.conversationId],
      references: [conversations.id],
    }),
  }),
)

export const wordsRelations = relations(words, ({ many, one }) => ({
  pronunciationAssessment: one(pronunciationsAssessment, {
    fields: [words.pronunciationAssessmentId],
    references: [pronunciationsAssessment.id],
  }),
  phonemes: many(phonemes),
}))

export const usersRelations = relations(users, ({ many, one }) => ({
  authorConversations: many(conversations, {
    relationName: 'author',
  }),
  conversations: many(conversations, {
    relationName: 'recipient',
  }),
  availability: one(usersAvailability),
  profile: one(usersProfile),
  customer: one(customers),
  histories: many(histories),
  pronunciationsAssessment: many(pronunciationsAssessment),
  subscriptions: many(subscriptions),
}))

export const usersAvailabilityRelations = relations(
  usersAvailability,
  ({ one }) => ({
    user: one(users, {
      fields: [usersAvailability.userId],
      references: [users.id],
    }),
  }),
)
export const usersProfileRelations = relations(usersProfile, ({ one }) => ({
  user: one(users, {
    fields: [usersProfile.userId],
    references: [users.id],
  }),
}))

export const customersRelations = relations(customers, ({ one }) => ({
  user: one(users, {
    fields: [customers.id],
    references: [users.id],
  }),
}))

export const speechsRelations = relations(speechs, ({ many }) => ({
  speechsToConversations: many(speechsToConversations),
}))

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    pronunciationAssessment: one(pronunciationsAssessment),
    speechsToConversations: many(speechsToConversations),
    author: one(users, {
      fields: [conversations.authorId],
      references: [users.id],
    }),
    recipient: one(users, {
      fields: [conversations.recipientId],
      references: [users.id],
    }),
  }),
)

export const pronunciationsAssessmentRelations = relations(
  pronunciationsAssessment,
  ({ one, many }) => ({
    user: one(users, {
      fields: [pronunciationsAssessment.creatorId],
      references: [users.id],
    }),
    conversation: one(conversations, {
      fields: [pronunciationsAssessment.conversationId],
      references: [conversations.id],
    }),
    words: many(words),
  }),
)

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  price: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
  }),
}))

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  subscriptions: many(subscriptions),
}))

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}))

export const phonemesRelations = relations(phonemes, ({ one }) => ({
  word: one(words, {
    fields: [phonemes.wordId],
    references: [words.id],
  }),
}))
