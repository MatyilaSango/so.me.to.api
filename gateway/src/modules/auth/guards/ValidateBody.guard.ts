import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isEmptyObject } from '../helpers/body.helper';

@Injectable()
export class ValidateBodyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const body = context.switchToHttp().getRequest()?.body;

    if (isEmptyObject(body)) return true;
    return false;
  }
}
