import { Request } from 'express';
import { IncomingHttpHeaders } from 'node:http';

/**
 * Get request headers
 *
 * @param request - Http request
 * @returns {IncomingHttpHeaders} headers
 */
export const getRequestHeaders = (request: Request): IncomingHttpHeaders => {
  return request.headers;
};
