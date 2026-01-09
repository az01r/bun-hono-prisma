import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { AuthResponseSchema, LoginUserSchema, SignupUserSchema, UpdateUserSchema, ResponseUserSchema, DeleteUserResponseSchema } from '../models/user.model'
import { deleteUser, getUser, login, signup, updateUser } from '../controllers/user.controller'
import { ErrorResponseSchema } from '../models/error.model'
import { isAuth } from '../middlewares/is-auth'
import { AppEnv } from '../models/app.model'
import { INVALID_EMAIL_OR_PASSWORD, UNAUTHORIZED, USER_DELETED_SUCCESSFULLY, USER_NOT_FOUND, VALIDATION_ERROR } from '../utils/constants'

export const signupRoute = createRoute({
  method: 'post',
  path: '/signup',
  request: {
    body: {
      content: {
        'application/json': { schema: SignupUserSchema },
      },
    },
  },
  responses: {
    201: {
      content: { 'application/json': { schema: AuthResponseSchema } },
      description: 'User signup successfully',
    },
    409: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: 'User already registered',
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const loginRoute = createRoute({
  method: 'post',
  path: '/login',
  request: {
    body: {
      content: {
        'application/json': { schema: LoginUserSchema },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: AuthResponseSchema } },
      description: 'User login successfully',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: INVALID_EMAIL_OR_PASSWORD,
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const getUserRoute = createRoute({
  method: 'get',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseUserSchema } },
      description: 'Return logged user details',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: USER_NOT_FOUND,
    },
  },
})

export const updateUserRoute = createRoute({
  method: 'put',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  request: {
    body: {
      content: {
        'application/json': { schema: UpdateUserSchema },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseUserSchema } },
      description: 'Return logged user details',
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: USER_NOT_FOUND,
    },
    422: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: VALIDATION_ERROR,
    },
  },
})

export const deleteUserRoute = createRoute({
  method: 'delete',
  path: '/',
  security: [{ Bearer: [] }],
  middleware: [isAuth],
  responses: {
    200: {
      content: { 'application/json': { schema: DeleteUserResponseSchema } },
      description: USER_DELETED_SUCCESSFULLY,
    },
    401: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: UNAUTHORIZED,
    },
    404: {
      content: { 'application/json': { schema: ErrorResponseSchema } },
      description: USER_NOT_FOUND,
    },
  },
})

const userRouter = new OpenAPIHono<AppEnv>()

userRouter.openapi(signupRoute, signup)
userRouter.openapi(loginRoute, login)
userRouter.openapi(getUserRoute, getUser)
userRouter.openapi(updateUserRoute, updateUser)
userRouter.openapi(deleteUserRoute, deleteUser)

export default userRouter
