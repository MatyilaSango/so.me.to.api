import { createParamDecorator, ExecutionContext, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getRequestHeaders } from '../helpers/requestHeaders.helper';

/**
 * Custorm decorator to get request user object from request.
 */
export const Userdoc = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const jwtService = new JwtService();
  const request = ctx.switchToHttp().getRequest();
  const { authorization } = getRequestHeaders(request);

  const [token] = authorization.split(' ');

  const payload = jwtService.verify(token);

  const user = payload;

  if (!user) throw new UnprocessableEntityException();

  return user;
});
