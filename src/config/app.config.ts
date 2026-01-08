import { OpenAPIHono } from '@hono/zod-openapi'
import { registerUserRoutes } from '../routes/user.routes'
import { registerSwaggerRoutes } from './swagger.config'
import { registerErrorRoute } from '../routes/error.routes'
import { AppEnv } from '../models/app.model'

/**
 * Create and configure the Hono application
 * @returns Configured OpenAPIHono instance
 */
export const createApp = () => {
  const app = new OpenAPIHono<AppEnv>()

  registerUserRoutes(app)
  registerSwaggerRoutes(app)
  registerErrorRoute(app)

  return app
}
