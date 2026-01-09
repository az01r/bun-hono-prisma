import { RouteHandler } from '@hono/zod-openapi'
import { createInvoiceRoute, deleteInvoiceRoute, getInvoiceRoute, getManyInvoicesRoute, updateInvoiceRoute } from '../routes/invoice.routes'
import { CreateInvoiceDTO, FetchOptionsInvoice, ReadUniqueInvoiceDTO, ResponseInvoiceDTO, UpdateInvoiceDTO } from '../models/invoice.model'
import { AppEnv } from '../models/app.model'
import InvoiceService from '../services/invoice.service'
import { INVOICE_DELETED_SUCCESSFULLY } from '../utils/constants'

export const createInvoice: RouteHandler<typeof createInvoiceRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const createInvoiceDTO: CreateInvoiceDTO = c.req.valid('json')
  const invoice: ResponseInvoiceDTO = await InvoiceService.createInvoice(userId, createInvoiceDTO)
  return c.json(invoice, 201)
}

export const getManyInvoices: RouteHandler<typeof getManyInvoicesRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const fetchOptionsInvoice: FetchOptionsInvoice = c.req.valid('query')
  const invoices: ResponseInvoiceDTO[] = await InvoiceService.getManyInvoices(userId, fetchOptionsInvoice)
  return c.json(invoices, 200)
}

export const getInvoice: RouteHandler<typeof getInvoiceRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const readUniqueInvoiceDTO: ReadUniqueInvoiceDTO = c.req.valid('param')
  const invoice: ResponseInvoiceDTO = await InvoiceService.getInvoice(userId, readUniqueInvoiceDTO)
  return c.json(invoice, 200)
}

export const updateInvoice: RouteHandler<typeof updateInvoiceRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const readUniqueInvoiceDTO: ReadUniqueInvoiceDTO = c.req.valid('param')
  const updateInvoiceDTO: UpdateInvoiceDTO = c.req.valid('json')
  const invoice: ResponseInvoiceDTO = await InvoiceService.updateInvoice(userId, readUniqueInvoiceDTO, updateInvoiceDTO)
  return c.json(invoice, 200)
}

export const deleteInvoice: RouteHandler<typeof deleteInvoiceRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const readUniqueInvoiceDTO: ReadUniqueInvoiceDTO = c.req.valid('param')
  await InvoiceService.deleteInvoice(userId, readUniqueInvoiceDTO)
  return c.json({ message: INVOICE_DELETED_SUCCESSFULLY }, 200)
}
