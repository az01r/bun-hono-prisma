import { z } from '@hono/zod-openapi'
import { USER_DELETED_SUCCESSFULLY } from '../utils/constants'

export const SignupUserSchema = z.object({
  email: z.email().openapi({ example: 'john@example.com' }),
  password: z.string().min(8).openapi({ example: 'password123' }),
}).openapi('SignupUser')

export type SignupUser = z.infer<typeof SignupUserSchema>

export const LoginUserSchema = z.object({
  email: z.email().openapi({ example: 'john@example.com' }),
  password: z.string().min(8).openapi({ example: 'password123' }),
}).openapi('LoginUser')

export type LoginUser = z.infer<typeof LoginUserSchema>

export const AuthResponseSchema = z.object({
  jwt: z.string().openapi({ example: 'your-jwt-token' }),
  message: z.string().openapi({ example: 'Signup/Login successful' }),
}).openapi('AuthResponse')

export type AuthResponse = z.infer<typeof AuthResponseSchema>

export const ResponseUserSchema = z.object({
  id: z.uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  email: z.string().openapi({ example: 'john@example.com' }),
  firstName: z.string().nullable().openapi({ example: 'John' }),
  lastName: z.string().nullable().openapi({ example: 'Doe' }),
  birthDate: z.date().nullable().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  createdAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
  updatedAt: z.date().openapi({ example: '2022-01-01T00:00:00.000Z' }),
}).openapi('User')

export type ResponseUserDTO = z.infer<typeof ResponseUserSchema>

export const UpdateUserSchema = z.object({
  email: z.string().openapi({ example: 'john@example.com' }),
  password: z.string().min(8).openapi({ example: 'password123' }),
  firstName: z.string().nullable().openapi({ example: 'John' }),
  lastName: z.string().nullable().openapi({ example: 'Doe' }),
  birthDate: z.date().nullable().openapi({ example: '2022-01-01T00:00:00.000Z' }),
}).openapi('UpdateUser')

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>

export const DeleteUserResponseSchema = z.object({
  message: z.string().openapi({ example: USER_DELETED_SUCCESSFULLY }),
}).openapi('DeleteUserResponse')

export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>




