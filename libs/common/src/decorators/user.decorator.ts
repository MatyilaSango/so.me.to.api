import { createParamDecorator, ExecutionContext, UnprocessableEntityException } from '@nestjs/common';

/**
 * Custorm decorator to get request user object from request.
 */
export const Userdoc = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const { user } = request;

  if (!user) throw new UnprocessableEntityException();

  return user;
});
