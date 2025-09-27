import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
 
export const santri = pgTable('santri', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 256 }).notNull(),
  kelas: varchar('kelas', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});