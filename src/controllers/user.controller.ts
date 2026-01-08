import { RouteHandler } from '@hono/zod-openapi'
import { deleteUserRoute, getUserRoute, loginRoute, signupRoute, updateUserRoute } from '../routes/user.routes'
import { AuthResponse, LoginUser, UpdateUserDTO, ResponseUserDTO } from '../models/user.model'
import UserService from '../services/user-service'
import { SignupUser } from '../models/user.model'
import { LOGIN_SUCCESSFUL, SIGNUP_SUCCESSFUL, USER_DELETED_SUCCESSFULLY } from '../utils/constants'
import { AppEnv } from '../models/app.model'

export const signup: RouteHandler<typeof signupRoute, AppEnv> = async (c) => {
  const body: SignupUser = c.req.valid('json')
  const token = await UserService.signup(body)
  const signupResponse: AuthResponse = { jwt: token, message: SIGNUP_SUCCESSFUL }
  return c.json(signupResponse, 201)
}

export const login: RouteHandler<typeof loginRoute, AppEnv> = async (c) => {
  const body: LoginUser = c.req.valid('json')
  const token = await UserService.login(body)
  const loginResponse: AuthResponse = { jwt: token, message: LOGIN_SUCCESSFUL }
  return c.json(loginResponse, 200)
}

export const getUser: RouteHandler<typeof getUserRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const user: ResponseUserDTO = await UserService.getUser(userId)
  return c.json(user, 200)
}

export const updateUser: RouteHandler<typeof updateUserRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  const body: UpdateUserDTO = c.req.valid('json')
  const user: ResponseUserDTO = await UserService.updateUser(userId, body)
  return c.json(user, 200)
}

export const deleteUser: RouteHandler<typeof deleteUserRoute, AppEnv> = async (c) => {
  const userId = c.get('userId')
  await UserService.deleteUser(userId)
  return c.json({ message: USER_DELETED_SUCCESSFULLY }, 200)
}
