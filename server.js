import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { db } from "./db/index.js";
import { santri } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = new Hono();

// CREATE
app.post('api/santri', async (c) => {
  const data = await c.req.json();
  const result = await db.insert(santri).values(data).returning();
  return c.json({ error: false, data: result[0] }, 201);
});

// READ ALL
app.get('api/santri', async (c) => {
  const result = await db.query.santri.findMany();
  return c.json({ error: false, data: result });
});

// READ ONE
app.get('api/santri/:id', async (c) => {
  const id = Number(c.req.param("id"));
  const result = await db.query.santri.findFirst({
    where: eq(santri.id, id),
  });
  if (!result) return c.json({ error: true, message: "Not Found" }, 404);
  return c.json({ error: false, data: result });
});

// UPDATE
app.put('api/santri/:id', async (c) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  const result = await db
    .update(santri)
    .set(data)
    .where(eq(santri.id, id))
    .returning();
    if (result.length === 0)
        return c.json({ error: true, message: 'Not found' }, 404);
    return c.json({ error: false, data: result[0] });
});

// DELETE
app.delete('/api/santri/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const result = await db.delete(santri).where(eq(santri.id, id)).returning();
    if (result.length === 0) 
        return c.json({ error: true, message: 'Not found' }, 404);
    return c.json({ error: false, message: `Deleted id ${id}` });
});

// Info About API
app.get('/', async (c) => {
    return c.html(
        `<div><h1>Doc API</h1></div><a href="/api/santri">/api/santri</a>`
    );
});

serve({fetch: app.fetch, port: 5000});
console.log('✅ API running at http://localhost:5000');