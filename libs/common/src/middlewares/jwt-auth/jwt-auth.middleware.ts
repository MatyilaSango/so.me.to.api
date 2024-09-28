import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedException();

    const [, token] = authorization.split(' ');

    try {
      const user = this.jwtService.verify(token);

      req['user'] = user;
    } catch (tokenExpiredError) {
      throw new UnauthorizedException('Token expired');
    }

    next();
  }
}
