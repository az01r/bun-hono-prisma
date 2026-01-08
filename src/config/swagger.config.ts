import { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'
import { AppEnv } from '../models/app.model'

/**
 * Register Swagger/OpenAPI documentation endpoints
 * @param app - OpenAPIHono instance
 */
export const registerSwaggerRoutes = (app: OpenAPIHono<AppEnv>) => {
  // LLMs.txt endpoint
  app.get('/llms.txt', async (c) => {
    const spec = app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'User API', version: 'v1' }
    })
    const markdown = await createMarkdownFromOpenApi(JSON.stringify(spec))
    return c.text(markdown)
  })

  // OpenAPI JSON specification
  app.doc('/openapi.json', {
    openapi: '3.1.0',
    info: { title: 'User API', version: 'v1.0.0' },
    security: [{ Bearer: [] }],
  })

  // Scalar UI
  app.get('/docs', Scalar({
    theme: 'purple',
    url: '/openapi.json',
  }))

  app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
}
