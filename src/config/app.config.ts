import { OpenAPIHono } from '@hono/zod-openapi'
import userRouter from '../routes/user.routes'
// import taxProfileRouter from '../routes/tax-profile.routes'
// import invoiceRouter from '../routes/invoice.routes'
import { registerOpenApiRoutes } from './openapi.config'
import { errorHandler } from '../middlewares/error-handler'
import { AppEnv } from '../models/app.model'

/**
 * Create and configure the Hono application
 * @returns Configured OpenAPIHono instance
 */
export const createApp = () => {
  const app = new OpenAPIHono<AppEnv>()

  app.route('/user', userRouter)
  // app.route('/tax-profile', taxProfileRouter)
  // app.route('/invoice', invoiceRouter)

  registerOpenApiRoutes(app)

  app.onError(errorHandler)

  return app
}
