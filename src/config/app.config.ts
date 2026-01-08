import { OpenAPIHono } from '@hono/zod-openapi'
import { registerUserRoutes } from '../routes/user.routes'
import { registerSwaggerRoutes } from './swagger.config'

/**
 * Create and configure the Hono application
 * @returns Configured OpenAPIHono instance
 */
export const createApp = () => {
  const app = new OpenAPIHono()

  // Register documentation routes
  registerSwaggerRoutes(app)

  return app
}
