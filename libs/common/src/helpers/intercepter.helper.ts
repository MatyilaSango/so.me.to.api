import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Get respone metadata.
 *
 * @param context - context
 * @param statusCode - response status code
 * @param request - request
 * @returns
 */
export const getResponeMetaData = (
  statusCode: number,
  context: ExecutionContext,
  request: Request,
) => {
  return {
    statusCode,
    message: undefined,
    timestamp: new Date().toISOString(),
    protocol: context.getType(),
    host: request.hostname,
    endpoint: request.url,
  };
};
