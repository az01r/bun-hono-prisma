import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { CreateTaxProfileSchema, DeleteTaxProfileResponseSchema, FetchOptionsTaxProfileSchema, ReadUniqueTaxProfileSchema, ResponseTaxProfileSchema, UpdateTaxProfileSchema } from '../models/tax-profile.model'
import { ErrorResponseSchema } from '../models/error.model'
import { isAuth } from '../middlewares/is-auth'
import { AppEnv } from '../models/app.model'
import { TAX_PROFILE_DELETED_SUCCESSFULLY, TAX_PROFILE_NOT_FOUND, UNAUTHORIZED, VALIDATION_ERROR } from '../utils/constants'
import { createTaxProfile, deleteTaxProfile, getManyTaxProfiles, getTaxProfile, updateTaxProfile } from '../controllers/tax-profile.controller'

export const createTaxProfileRoute = createRoute({
  method: 'post',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    body: {
      content: {
        'application/json': { schema: CreateTaxProfileSchema },
      },
    },
  },
  responses: {
    201: {
      content: { 'application/json': { schema: ResponseTaxProfileSchema } },
      description: 'Tax profile created successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const getTaxProfileRoute = createRoute({
  method: 'get',
  path: '/:id',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    params: ReadUniqueTaxProfileSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseTaxProfileSchema } },
      description: 'Tax profile found successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: TAX_PROFILE_NOT_FOUND,
    },
  },
})

export const getManyTaxProfilesRoute = createRoute({
  method: 'get',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    query: FetchOptionsTaxProfileSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseTaxProfileSchema.array() } },
      description: 'Tax profiles found successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const updateTaxProfileRoute = createRoute({
  method: 'put',
  path: '/:id',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    params: ReadUniqueTaxProfileSchema,
    body: {
      content: {
        'application/json': { schema: UpdateTaxProfileSchema },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseTaxProfileSchema } },
      description: 'Tax profile updated successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: TAX_PROFILE_NOT_FOUND,
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const deleteTaxProfileRoute = createRoute({
  method: 'delete',
  path: '/:id',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    params: ReadUniqueTaxProfileSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: DeleteTaxProfileResponseSchema } },
      description: TAX_PROFILE_DELETED_SUCCESSFULLY,
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: TAX_PROFILE_NOT_FOUND,
    },
  },
})

const taxProfileRouter = new OpenAPIHono<AppEnv>()

taxProfileRouter.openapi(createTaxProfileRoute, createTaxProfile)
taxProfileRouter.openapi(getManyTaxProfilesRoute, getManyTaxProfiles)
taxProfileRouter.openapi(getTaxProfileRoute, getTaxProfile)
taxProfileRouter.openapi(updateTaxProfileRoute, updateTaxProfile)
taxProfileRouter.openapi(deleteTaxProfileRoute, deleteTaxProfile)

export default taxProfileRouter
