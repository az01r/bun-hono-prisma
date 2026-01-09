import { z } from 'zod'
import { INVOICE_DELETED_SUCCESSFULLY, TAX_PROFILE_DELETED_SUCCESSFULLY } from '../utils/constants'

export const CreateInvoiceSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'CANCELLED']).openapi({ example: 'PENDING' }),
  amount: z.coerce.number().openapi({ example: 100 }),
  currency: z.enum(['EUR', 'USD', 'GBP']).openapi({ example: 'EUR' }),
  taxProfileId: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
}).openapi('CreateInvoiceDTO')

export type CreateInvoiceDTO = z.infer<typeof CreateInvoiceSchema>

export const FetchOptionsInvoiceSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'CANCELLED']).optional().openapi({ example: 'PENDING' }),
  amount: z.coerce.number().optional().openapi({ example: 100 }),
  currency: z.enum(['EUR', 'USD', 'GBP']).optional().openapi({ example: 'EUR' }),
  taxProfileId: z.string().optional().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  gteCreatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  lteCreatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  gteUpdatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  lteUpdatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  skip: z.coerce.number().positive().optional().openapi({ example: 5 }),
  take: z.coerce.number().positive().optional().openapi({ example: 5 }),
}).openapi('FetchOptionsInvoice')

export type FetchOptionsInvoice = z.infer<typeof FetchOptionsInvoiceSchema>

export const ResponseInvoiceSchema = z.object({
  id: z.uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  status: z.enum(['PENDING', 'PAID', 'CANCELLED']).openapi({ example: 'PENDING' }),
  amount: z.coerce.number().openapi({ example: 100 }),
  currency: z.enum(['EUR', 'USD', 'GBP']).openapi({ example: 'EUR' }),
  taxProfileId: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  createdAt: z.date().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2026-01-01T00:00:00.000Z' }),
}).openapi('ResponseInvoiceDTO')

export type ResponseInvoiceDTO = z.infer<typeof ResponseInvoiceSchema>

export const ReadUniqueInvoiceSchema = z.object({
  id: z.uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
}).openapi('ReadUniqueInvoiceDTO')

export type ReadUniqueInvoiceDTO = z.infer<typeof ReadUniqueInvoiceSchema>

export const UpdateInvoiceSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'CANCELLED']).optional().openapi({ example: 'PENDING' }),
  amount: z.coerce.number().optional().openapi({ example: 100 }),
  currency: z.enum(['EUR', 'USD', 'GBP']).optional().openapi({ example: 'EUR' }),
}).openapi('UpdateInvoiceDTO')

export type UpdateInvoiceDTO = z.infer<typeof UpdateInvoiceSchema>

export const DeleteInvoiceResponseSchema = z.object({
  message: z.string().openapi({ example: INVOICE_DELETED_SUCCESSFULLY }),
}).openapi('DeleteInvoiceResponse')

export type DeleteInvoiceResponse = z.infer<typeof DeleteInvoiceResponseSchema>