import { getResponeMetaData } from '@/libs/common/src/helpers/intercepter.helper';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              {
                data: err,
                _metadata: getResponeMetaData(
                  err.response?.statusCode,
                  context,
                  request,
                ),
              },
              err.response?.statusCode,
            ),
        ),
      ),
    );
  }
}
