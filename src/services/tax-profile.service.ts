import TaxProfileDAO from "../daos/tax-profile.dao";
import { Prisma } from "../generated/prisma/client";
import { ResourceNotFoundError } from "../models/error.model";
import { CreateTaxProfileDTO, FetchOptionsTaxProfile, ReadUniqueTaxProfileDTO, ResponseTaxProfileDTO, UpdateTaxProfileDTO } from "../models/tax-profile.model";
import { DEFAULT_SKIP, DEFAULT_TAKE, TAX_PROFILE_NOT_FOUND } from "../utils/constants";

class TaxProfileService {

  createTaxProfile = async (userId: string, taxProfileDto: CreateTaxProfileDTO) => {
    const taxProfileData: Prisma.TaxProfileCreateInput = {
      user: { connect: { id: userId } },
      legalName: taxProfileDto.legalName,
      vatNumber: taxProfileDto.vatNumber,
      address: taxProfileDto.address,
      city: taxProfileDto.city,
      zipCode: taxProfileDto.zipCode,
      country: taxProfileDto.country,
    };
    const taxProfile = await TaxProfileDAO.createTaxProfile(taxProfileData);
    const taxProfileResponseDTO: ResponseTaxProfileDTO = {
      id: taxProfile.id,
      userId: taxProfile.userId,
      legalName: taxProfile.legalName,
      vatNumber: taxProfile.vatNumber,
      address: taxProfile.address,
      city: taxProfile.city,
      zipCode: taxProfile.zipCode,
      country: taxProfile.country,
      createdAt: taxProfile.createdAt,
      updatedAt: taxProfile.updatedAt
    };
    return taxProfileResponseDTO;
  }

  getManyTaxProfiles = async (userId: string, fetchOptionsTaxProfile: FetchOptionsTaxProfile) => {
    const where: Prisma.TaxProfileWhereInput = {
      userId,
      legalName: fetchOptionsTaxProfile.legalName ? { contains: fetchOptionsTaxProfile.legalName } : undefined,
      vatNumber: fetchOptionsTaxProfile.vatNumber ? { contains: fetchOptionsTaxProfile.vatNumber } : undefined,
      address: fetchOptionsTaxProfile.address ? { contains: fetchOptionsTaxProfile.address } : undefined,
      city: fetchOptionsTaxProfile.city ? { contains: fetchOptionsTaxProfile.city } : undefined,
      country: fetchOptionsTaxProfile.country ? { contains: fetchOptionsTaxProfile.country } : undefined,
      zipCode: fetchOptionsTaxProfile.zipCode ? { contains: fetchOptionsTaxProfile.zipCode } : undefined,
    };

    let createdAtWhere: Prisma.DateTimeFilter<"TaxProfile"> = {};
    if (fetchOptionsTaxProfile.gteCreatedAt) {
      createdAtWhere.gte = fetchOptionsTaxProfile.gteCreatedAt;
    }
    if (fetchOptionsTaxProfile.lteCreatedAt) {
      createdAtWhere.lte = fetchOptionsTaxProfile.lteCreatedAt;
    }
    if (fetchOptionsTaxProfile.gteCreatedAt || fetchOptionsTaxProfile.lteCreatedAt) {
      where.createdAt = createdAtWhere;
    }

    let updatedAtWhere: Prisma.DateTimeFilter<"TaxProfile"> = {};
    if (fetchOptionsTaxProfile.gteUpdatedAt) {
      updatedAtWhere.gte = fetchOptionsTaxProfile.gteUpdatedAt;
    }
    if (fetchOptionsTaxProfile.lteUpdatedAt) {
      updatedAtWhere.lte = fetchOptionsTaxProfile.lteUpdatedAt;
    }
    if (fetchOptionsTaxProfile.gteUpdatedAt || fetchOptionsTaxProfile.lteUpdatedAt) {
      where.updatedAt = updatedAtWhere;
    }

    const taxProfiles = await TaxProfileDAO.findTaxProfiles(where, fetchOptionsTaxProfile.skip || DEFAULT_SKIP, fetchOptionsTaxProfile.take || DEFAULT_TAKE);
    const taxProfilesResponseDTO: ResponseTaxProfileDTO[] = taxProfiles.map(taxProfile => ({
      id: taxProfile.id,
      userId: taxProfile.userId,
      legalName: taxProfile.legalName,
      vatNumber: taxProfile.vatNumber,
      address: taxProfile.address,
      city: taxProfile.city,
      zipCode: taxProfile.zipCode,
      country: taxProfile.country,
      createdAt: taxProfile.createdAt,
      updatedAt: taxProfile.updatedAt
    }));
    return taxProfilesResponseDTO;
  }

  getTaxProfile = async (userId: string, { id }: ReadUniqueTaxProfileDTO) => {
    const where: Prisma.TaxProfileWhereUniqueInput = { id, userId };
    const taxProfile = await TaxProfileDAO.findTaxProfile(where);
    if (!taxProfile) {
      throw new ResourceNotFoundError(TAX_PROFILE_NOT_FOUND);
    }
    const taxProfileResponseDTO: ResponseTaxProfileDTO = {
      id: taxProfile.id,
      userId: taxProfile.userId,
      legalName: taxProfile.legalName,
      vatNumber: taxProfile.vatNumber,
      address: taxProfile.address,
      city: taxProfile.city,
      zipCode: taxProfile.zipCode,
      country: taxProfile.country,
      createdAt: taxProfile.createdAt,
      updatedAt: taxProfile.updatedAt
    };
    return taxProfileResponseDTO;
  }

  updateTaxProfile = async (userId: string, { id }: ReadUniqueTaxProfileDTO, taxProfileDto: UpdateTaxProfileDTO) => {
    await this.getTaxProfile(userId, { id });
    const where: Prisma.TaxProfileWhereUniqueInput = { id, userId };
    const dataToUpdate: Prisma.TaxProfileUpdateWithoutUserInput = { legalName: taxProfileDto.legalName, vatNumber: taxProfileDto.vatNumber, address: taxProfileDto.address, city: taxProfileDto.city, zipCode: taxProfileDto.zipCode, country: taxProfileDto.country };
    const taxProfile = await TaxProfileDAO.updateTaxProfile(where, dataToUpdate);
    const taxProfileResponseDTO: ResponseTaxProfileDTO = {
      id: taxProfile.id,
      userId: taxProfile.userId,
      legalName: taxProfile.legalName,
      vatNumber: taxProfile.vatNumber,
      address: taxProfile.address,
      city: taxProfile.city,
      zipCode: taxProfile.zipCode,
      country: taxProfile.country,
      createdAt: taxProfile.createdAt,
      updatedAt: taxProfile.updatedAt
    };
    return taxProfileResponseDTO;
  }

  deleteTaxProfile = async (userId: string, { id }: ReadUniqueTaxProfileDTO) => {
    await this.getTaxProfile(userId, { id });
    const where: Prisma.TaxProfileWhereUniqueInput = { id, userId };
    await TaxProfileDAO.deleteTaxProfile(where);
  }
}

export default new TaxProfileService();