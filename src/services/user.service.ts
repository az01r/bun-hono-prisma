import { Prisma } from "../generated/prisma/client.js";
import UserDAO from "../daos/user.dao.js";
import { INVALID_EMAIL_OR_PASSWORD, USER_ALREADY_REGISTERED, USER_NOT_FOUND } from "../utils/constants.js";
import { LoginUser, ResponseUserDTO, SignupUser, UpdateUserDTO } from "../models/user.model.js";
import { sign } from "hono/jwt";
import { ConflictError, ResourceNotFoundError, UnauthorizedError } from "../models/error.model.js";
import { password as bcrypt } from "bun";

class UserService {

  private jwtSign = async (userId: string) => {
    return await sign({
      userId,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.JWT_EXPIRATION_IN_HOURS) * (60 * 60),
    }, process.env.JWT_SECRET!);
  };

  private hash = async (stringToBeHashed: string) => {
    return await bcrypt.hash(stringToBeHashed, { algorithm: "bcrypt", cost: 12 });
  };

  signup = async ({ email, password }: SignupUser) => {
    const where: Prisma.UserWhereUniqueInput = { email };
    const existingUser = await UserDAO.findUser(where);
    if (existingUser) {
      throw new ConflictError(USER_ALREADY_REGISTERED);
    }
    const hashedPassword = await this.hash(password);
    const user = await UserDAO.createUser({ email, password: hashedPassword });
    const token = await this.jwtSign(user.id);
    return token;
  }

  login = async ({ email, password }: LoginUser) => {
    const where: Prisma.UserWhereUniqueInput = { email };
    const user = await UserDAO.findUser(where);
    if (!user) {
      throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD);
    }
    const isEqual = await bcrypt.verify(password, user.password!);
    if (!isEqual) {
      throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD);
    }
    const token = await this.jwtSign(user.id);
    return token;
  }

  getUser = async (id: string) => {
    const where: Prisma.UserWhereUniqueInput = { id };
    const user = await UserDAO.findUser(where);
    if (!user) {
      throw new ResourceNotFoundError(USER_NOT_FOUND);
    }
    const result: ResponseUserDTO = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    return result;
  }

  updateUser = async (id: string, userDto: UpdateUserDTO) => {
    let hashedPassword: string | undefined = undefined;
    if (userDto.password) {
      hashedPassword = await this.hash(userDto.password);
    }
    const data: Prisma.UserUpdateInput = { email: userDto.email, password: hashedPassword, firstName: userDto.firstName, lastName: userDto.lastName, birthDate: userDto.birthDate ? new Date(userDto.birthDate) : undefined };
    const where: Prisma.UserWhereUniqueInput = { id };
    const user = await UserDAO.updateUser(where, data);
    if (!user) {
      throw new ResourceNotFoundError(USER_NOT_FOUND);
    }
    const result: ResponseUserDTO = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    return result;
  }

  deleteUser = async (id: string) => {
    const where: Prisma.UserWhereUniqueInput = { id };
    const user = await UserDAO.deleteUser(where);
    if (!user) {
      throw new ResourceNotFoundError(USER_NOT_FOUND);
    }
  }
}

export default new UserService();