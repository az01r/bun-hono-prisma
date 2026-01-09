import z from "zod"

export class ResourceNotFoundError extends Error { }
export class UnauthorizedError extends Error { }
export class ConflictError extends Error { }

export const ErrorResponseSchema = z.object({
  status: z.string().openapi({ example: 'error' }),
  message: z.string().openapi({ example: 'Error Message' }),
  validationErrors: z.record(z.string(), z.array(z.string())).optional()
}).openapi('ErrorResponse')

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>