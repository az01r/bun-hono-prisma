import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

export default { port: process.env.PORT, fetch: app.fetch }
