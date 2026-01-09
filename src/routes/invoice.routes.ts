import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { CreateInvoiceSchema, DeleteInvoiceResponseSchema, FetchOptionsInvoiceSchema, ReadUniqueInvoiceSchema, ResponseInvoiceSchema, UpdateInvoiceSchema } from '../models/invoice.model'
import { createInvoice, getInvoice, getManyInvoices, updateInvoice, deleteInvoice } from '../controllers/invoice.controller'
import { ErrorResponseSchema } from '../models/error.model'
import { isAuth } from '../middlewares/is-auth'
import { AppEnv } from '../models/app.model'
import { INVOICE_DELETED_SUCCESSFULLY, INVOICE_NOT_FOUND, UNAUTHORIZED, VALIDATION_ERROR } from '../utils/constants'

export const createInvoiceRoute = createRoute({
  method: 'post',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    body: {
      content: {
        'application/json': { schema: CreateInvoiceSchema },
      },
    },
  },
  responses: {
    201: {
      content: { 'application/json': { schema: ResponseInvoiceSchema } },
      description: 'Invoice created successfully',
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

export const getManyInvoicesRoute = createRoute({
  method: 'get',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    query: FetchOptionsInvoiceSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseInvoiceSchema.array() } },
      description: 'Invoices found successfully',
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

export const getInvoiceRoute = createRoute({
  method: 'get',
  path: '/:id',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    params: ReadUniqueInvoiceSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseInvoiceSchema } },
      description: 'Invoice found successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: INVOICE_NOT_FOUND,
    },
  },
})

export const updateInvoiceRoute = createRoute({
  method: 'put',
  path: '/:id',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    params: ReadUniqueInvoiceSchema,
    body: {
      content: {
        'application/json': { schema: UpdateInvoiceSchema },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseInvoiceSchema } },
      description: 'Invoice updated successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: INVOICE_NOT_FOUND,
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const deleteInvoiceRoute = createRoute({
  method: 'delete',
  path: '/:id',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    params: ReadUniqueInvoiceSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: DeleteInvoiceResponseSchema } },
      description: INVOICE_DELETED_SUCCESSFULLY,
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: INVOICE_NOT_FOUND,
    },
  },
})

const invoiceRouter = new OpenAPIHono<AppEnv>()

invoiceRouter.openapi(createInvoiceRoute, createInvoice)
invoiceRouter.openapi(getManyInvoicesRoute, getManyInvoices)
invoiceRouter.openapi(getInvoiceRoute, getInvoice)
invoiceRouter.openapi(updateInvoiceRoute, updateInvoice)
invoiceRouter.openapi(deleteInvoiceRoute, deleteInvoice)

export default invoiceRouter
