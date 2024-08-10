import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { getRequestHeaders } from '../../helpers/requestHeaders.helper';

/**
 * JWT authenication guard to check if authorization is present inside the request header.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = getRequestHeaders(request);

    if (!authorization) false;

    const [type] = authorization.split(' ');

    if (type === 'Bearer') return true;

    return false;
  }
}
