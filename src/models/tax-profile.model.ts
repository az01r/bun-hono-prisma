import { z } from 'zod'
import { TAX_PROFILE_DELETED_SUCCESSFULLY } from '../utils/constants'

export const CreateTaxProfileSchema = z.object({
  legalName: z.string().openapi({ example: 'John Doe' }),
  vatNumber: z.string().openapi({ example: 'IT000000' }),
  address: z.string().openapi({ example: '123 Main St' }),
  city: z.string().openapi({ example: 'New York' }),
  country: z.string().openapi({ example: 'USA' }),
  zipCode: z.string().openapi({ example: '12345' }),
}).openapi('CreateTaxProfileDTO')

export type CreateTaxProfileDTO = z.infer<typeof CreateTaxProfileSchema>

export const FetchOptionsTaxProfileSchema = z.object({
  legalName: z.string().optional().openapi({ example: 'John Doe' }),
  vatNumber: z.string().optional().openapi({ example: 'IT000000' }),
  address: z.string().optional().openapi({ example: '123 Main St' }),
  city: z.string().optional().openapi({ example: 'New York' }),
  country: z.string().optional().openapi({ example: 'USA' }),
  zipCode: z.string().optional().openapi({ example: '12345' }),
  gteCreatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  lteCreatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  gteUpdatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  lteUpdatedAt: z.coerce.date().optional().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  skip: z.coerce.number().positive().optional().openapi({ example: 5 }),
  take: z.coerce.number().positive().optional().openapi({ example: 5 }),
}).openapi('FetchOptionsTaxProfile')

export type FetchOptionsTaxProfile = z.infer<typeof FetchOptionsTaxProfileSchema>

export const ResponseTaxProfileSchema = z.object({
  id: z.uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  userId: z.uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  legalName: z.string().openapi({ example: 'John Doe' }),
  vatNumber: z.string().openapi({ example: 'IT000000' }),
  address: z.string().openapi({ example: '123 Main St' }),
  city: z.string().openapi({ example: 'New York' }),
  country: z.string().openapi({ example: 'USA' }),
  zipCode: z.string().openapi({ example: '12345' }),
  createdAt: z.date().openapi({ example: '2026-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2026-01-01T00:00:00.000Z' }),
}).openapi('ResponseTaxProfileDTO')

export type ResponseTaxProfileDTO = z.infer<typeof ResponseTaxProfileSchema>

export const ReadUniqueTaxProfileSchema = z.object({
  id: z.uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
}).openapi('ReadUniqueTaxProfileDTO')

export type ReadUniqueTaxProfileDTO = z.infer<typeof ReadUniqueTaxProfileSchema>

export const UpdateTaxProfileSchema = z.object({
  legalName: z.string().optional().openapi({ example: 'John Doe' }),
  vatNumber: z.string().optional().openapi({ example: 'IT000000' }),
  address: z.string().optional().openapi({ example: '123 Main St' }),
  city: z.string().optional().openapi({ example: 'New York' }),
  country: z.string().optional().openapi({ example: 'USA' }),
  zipCode: z.string().optional().openapi({ example: '12345' }),
}).openapi('UpdateTaxProfileDTO')

export type UpdateTaxProfileDTO = z.infer<typeof UpdateTaxProfileSchema>

export const DeleteTaxProfileResponseSchema = z.object({
  message: z.string().openapi({ example: TAX_PROFILE_DELETED_SUCCESSFULLY }),
}).openapi('DeleteTaxProfileResponse')

export type DeleteTaxProfileResponse = z.infer<typeof DeleteTaxProfileResponseSchema>