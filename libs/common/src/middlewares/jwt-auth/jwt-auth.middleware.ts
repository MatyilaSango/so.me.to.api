import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const jwtService = new JwtService();

    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');
    const secret = process.env.TOKEN_SECRETE;

    const user = jwtService.verify(token, { secret });

    req['user'] = user;

    next();
  }
}
