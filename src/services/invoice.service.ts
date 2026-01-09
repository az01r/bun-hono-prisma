import { Prisma } from "../generated/prisma/client"
import { DEFAULT_SKIP, DEFAULT_TAKE, INVOICE_NOT_FOUND } from "../utils/constants"
import { CreateInvoiceDTO, FetchOptionsInvoice, ReadUniqueInvoiceDTO, ResponseInvoiceDTO, UpdateInvoiceDTO } from "../models/invoice.model"
import InvoiceDAO from "../daos/invoice.dao"
import TaxProfileService from "./tax-profile.service"
import { ResourceNotFoundError } from "../models/error.model"

class InvoiceService {

  createInvoice = async (userId: string, invoiceDto: CreateInvoiceDTO) => {
    await TaxProfileService.getTaxProfile(userId, { id: invoiceDto.taxProfileId });
    const prismaData: Prisma.InvoiceCreateInput = { amount: invoiceDto.amount, status: invoiceDto.status, currency: invoiceDto.currency, taxProfile: { connect: { id: invoiceDto.taxProfileId, userId } } };
    const invoice = await InvoiceDAO.createInvoice(prismaData);
    const invoiceResponseDto: ResponseInvoiceDTO = {
      id: invoice.id,
      taxProfileId: invoice.taxProfileId,
      amount: invoice.amount,
      status: invoice.status,
      currency: invoice.currency,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    };
    return invoiceResponseDto;
  }

  getManyInvoices = async (userId: string, invoicesDto: FetchOptionsInvoice) => {
    const where: Prisma.InvoiceWhereInput = { taxProfile: { userId } };
    if (invoicesDto.taxProfileId) where.taxProfileId = invoicesDto.taxProfileId;
    if (invoicesDto.amount) where.amount = invoicesDto.amount;
    if (invoicesDto.status) where.status = invoicesDto.status;
    if (invoicesDto.currency) where.currency = invoicesDto.currency;

    let createdAtWhere: Prisma.DateTimeFilter<"Invoice"> = {};
    if (invoicesDto.gteCreatedAt) {
      createdAtWhere.gte = invoicesDto.gteCreatedAt;
    }
    if (invoicesDto.lteCreatedAt) {
      createdAtWhere.lte = invoicesDto.lteCreatedAt;
    }
    if (invoicesDto.gteCreatedAt || invoicesDto.lteCreatedAt) {
      where.createdAt = createdAtWhere;
    }

    let updatedAtWhere: Prisma.DateTimeFilter<"Invoice"> = {};
    if (invoicesDto.gteUpdatedAt) {
      updatedAtWhere.gte = invoicesDto.gteUpdatedAt;
    }
    if (invoicesDto.lteUpdatedAt) {
      updatedAtWhere.lte = invoicesDto.lteUpdatedAt;
    }
    if (invoicesDto.gteUpdatedAt || invoicesDto.lteUpdatedAt) {
      where.updatedAt = updatedAtWhere;
    }
    const invoices = await InvoiceDAO.findInvoices(where, invoicesDto.skip || DEFAULT_SKIP, invoicesDto.take || DEFAULT_TAKE);
    const invoicesResponseDTO: ResponseInvoiceDTO[] = invoices.map(invoice => ({
      id: invoice.id,
      taxProfileId: invoice.taxProfileId,
      amount: invoice.amount,
      status: invoice.status,
      currency: invoice.currency,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    }));
    return invoicesResponseDTO;
  }

  getInvoice = async (userId: string, { id }: ReadUniqueInvoiceDTO) => {
    const where: Prisma.InvoiceWhereUniqueInput = { id, taxProfile: { userId } };
    const invoice = await InvoiceDAO.findInvoice(where);
    if (!invoice) {
      throw new ResourceNotFoundError(INVOICE_NOT_FOUND);
    }
    const invoiceResponseDTO: ResponseInvoiceDTO = {
      id: invoice.id,
      taxProfileId: invoice.taxProfileId,
      amount: invoice.amount,
      status: invoice.status,
      currency: invoice.currency,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    };
    return invoiceResponseDTO;
  }

  updateInvoice = async (userId: string, { id }: ReadUniqueInvoiceDTO, invoiceDto: UpdateInvoiceDTO) => {
    await this.getInvoice(userId, { id });
    const where: Prisma.InvoiceWhereUniqueInput = { id, taxProfile: { userId } };
    const dataToUpdate: Prisma.InvoiceUpdateWithoutTaxProfileInput = { amount: invoiceDto.amount, status: invoiceDto.status, currency: invoiceDto.currency };
    const invoice = await InvoiceDAO.updateInvoice(where, dataToUpdate);
    const invoiceResponseDTO: ResponseInvoiceDTO = {
      id: invoice.id,
      taxProfileId: invoice.taxProfileId,
      amount: invoice.amount,
      status: invoice.status,
      currency: invoice.currency,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    };
    return invoiceResponseDTO;
  }

  deleteInvoice = async (userId: string, { id }: ReadUniqueInvoiceDTO) => {
    await this.getInvoice(userId, { id });
    const where: Prisma.InvoiceWhereUniqueInput = { id, taxProfile: { userId } };
    await InvoiceDAO.deleteInvoice(where);
  }
}

export default new InvoiceService();