import { ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Get respone metadata.
 *
 * @param context - context
 * @param response - response
 * @param request - request
 * @returns
 */
export const getResponeMetaData = (
  context: ExecutionContext,
  response: Response,
  request: Request,
) => {
  return {
    status: response.statusCode,
    message: undefined,
    timestamp: new Date().toISOString(),
    protocol: context.getType(),
    host: request.hostname,
    enpoint: request.url,
  };
};
