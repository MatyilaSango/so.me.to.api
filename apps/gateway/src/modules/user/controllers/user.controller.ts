import { APP_MICROSERVICES, IAuthUser, JwtAuthGuard, User } from '@/libs/common/src';
import { Userdoc } from '@/libs/common/src/decorators/user.decorator';
import { Controller, Get, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(APP_MICROSERVICES.USER_MICROSERVICE) private readonly userClient: ClientProxy) {}

  @Get('info')
  async getUserInfo(@Userdoc() userdoc: IAuthUser) {
    const user = this.userClient.send<User, IAuthUser>({ cmd: 'get-user-by-uuid' }, userdoc);

    await user.forEach((_user) => {
      if (!_user) throw new UnauthorizedException();
    });

    return user;
  }
}
