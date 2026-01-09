import { RouteHandler } from '@hono/zod-openapi'
import { createTaxProfileRoute, deleteTaxProfileRoute, getManyTaxProfilesRoute, getTaxProfileRoute, updateTaxProfileRoute } from '../routes/tax-profile.routes'
import { CreateTaxProfileDTO, FetchOptionsTaxProfile, ReadUniqueTaxProfileDTO, ResponseTaxProfileDTO, UpdateTaxProfileDTO } from '../models/tax-profile.model'
import { AppEnv } from '../models/app.model'
import TaxProfileService from '../services/tax-profile.service'
import { TAX_PROFILE_DELETED_SUCCESSFULLY } from '../utils/constants'

export const createTaxProfile: RouteHandler<typeof createTaxProfileRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const createTaxProfileDTO: CreateTaxProfileDTO = c.req.valid('json')
  const taxProfile: ResponseTaxProfileDTO = await TaxProfileService.createTaxProfile(userId, createTaxProfileDTO)
  return c.json(taxProfile, 201)
}

export const getManyTaxProfiles: RouteHandler<typeof getManyTaxProfilesRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const fetchOptionsTaxProfile: FetchOptionsTaxProfile = c.req.valid('query')
  const taxProfiles: ResponseTaxProfileDTO[] = await TaxProfileService.getManyTaxProfiles(userId, fetchOptionsTaxProfile)
  return c.json(taxProfiles, 200)
}

export const getTaxProfile: RouteHandler<typeof getTaxProfileRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const readUniqueTaxProfileDTO: ReadUniqueTaxProfileDTO = c.req.valid('param')
  const taxProfile: ResponseTaxProfileDTO = await TaxProfileService.getTaxProfile(userId, readUniqueTaxProfileDTO)
  return c.json(taxProfile, 200)
}

export const updateTaxProfile: RouteHandler<typeof updateTaxProfileRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const readUniqueTaxProfileDTO: ReadUniqueTaxProfileDTO = c.req.valid('param')
  const updateTaxProfileDTO: UpdateTaxProfileDTO = c.req.valid('json')
  const taxProfile: ResponseTaxProfileDTO = await TaxProfileService.updateTaxProfile(userId, readUniqueTaxProfileDTO, updateTaxProfileDTO)
  return c.json(taxProfile, 200)
}

export const deleteTaxProfile: RouteHandler<typeof deleteTaxProfileRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const readUniqueTaxProfileDTO: ReadUniqueTaxProfileDTO = c.req.valid('param')
  await TaxProfileService.deleteTaxProfile(userId, readUniqueTaxProfileDTO)
  return c.json({ message: TAX_PROFILE_DELETED_SUCCESSFULLY }, 200)
}
