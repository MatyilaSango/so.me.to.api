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
        _metadata: {
          status: response.statusCode,
          message: response.message,
          timestamp: new Date().toISOString(),
          protocol: context.getType(),
          host: request.hostname,
          enpoint: request.url,
        },
      })),
    );
  }
}
