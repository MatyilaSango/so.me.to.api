import { createParamDecorator, ExecutionContext, UnprocessableEntityException } from '@nestjs/common';

/**
 * Custorm decorator to get request user object from request.
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest().User;

  if (!user) throw new UnprocessableEntityException();

  return user;
});
