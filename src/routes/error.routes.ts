import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "hono";
import { StatusCode } from 'hono/utils/http-status';
import { ConflictError, ErrorResponse, ResourceNotFoundError, UnauthorizedError } from "../models/error.model";
import { ZodError, treeifyError } from "zod";
import { AppEnv } from "../models/app.model";

const errorRoute = (err: Error, c: Context<AppEnv>) => {
  const message = err.message || "Internal Server Error";
  let statusCode: StatusCode = 500;

  let validationErrors: Record<string, string[]> | undefined;
  if (err instanceof ZodError) {
    validationErrors = treeifyError(err);
    statusCode = 422;
  } else if (err instanceof ResourceNotFoundError) {
    statusCode = 404;
  } else if (err instanceof UnauthorizedError) {
    statusCode = 401;
  } else if (err instanceof ConflictError) {
    statusCode = 409;
  } else {
    // logger.error({
    //   err,
    //   path: c.req.path,
    //   method: c.req.method,
    // }, 'Server error');
  }
  const errorResponse: ErrorResponse = {
    status: 'error',
    message,
    ...(validationErrors && { validationErrors })
  }
  return c.json(errorResponse, statusCode);
}


/**
 * Register error route
 * @param app - OpenAPIHono instance
 */
export const registerErrorRoute = (app: OpenAPIHono<AppEnv>) => {
  app.onError(errorRoute)
}