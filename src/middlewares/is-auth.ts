import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { UnauthorizedError } from '../models/error.model'
import { UNAUTHORIZED } from '../utils/constants'
import { AppEnv } from '../models/app.model'

export const isAuth = createMiddleware<AppEnv>(async (c, next) => {
  const token = c.req.header('Authorization')?.split('Bearer ')[1]

  if (!token) {
    throw new UnauthorizedError(UNAUTHORIZED)
  }

  try {
    const decodedToken = await verify(token, process.env.JWT_SECRET!)
    if (!decodedToken || !decodedToken.userId) {
      throw new UnauthorizedError(UNAUTHORIZED)
    }
    c.set('userId', decodedToken.userId as string)
    await next()
  } catch (error) {
    throw new UnauthorizedError(UNAUTHORIZED)
  }
})
