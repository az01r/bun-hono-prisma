import { PrismaClient } from "../generated/prisma/client";

declare global {
  var globalPrisma: PrismaClient | undefined;
}