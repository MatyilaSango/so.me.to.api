import { getResponeMetaData } from '@/libs/common/src/helpers/intercepter.helper';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        data: {
          statusCode: response.statusCode,
          ...data,
        },
        _metadata: getResponeMetaData(response.statusCode, context, request),
      })),
    );
  }
}
