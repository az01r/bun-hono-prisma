import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prismaClientSingleton = global.globalPrisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  global.globalPrisma = prismaClientSingleton
}

export default prismaClientSingleton