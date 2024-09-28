import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Body, Controller, Get, HttpException, Inject, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { APP_MICROSERVICES, IAuthUser, UserGuard, User } from '@/libs/common/src';
import { Userdoc } from '@/libs/common/src/decorators/user.decorator';
import { UpdateUserDto } from '@/libs/common/src/dtos/user.dto';
import { EnumMessagePattern } from '@/libs/common/src/types/enums/message-pattern.enum';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(APP_MICROSERVICES.USER_MICROSERVICE) private readonly userClient: ClientProxy) {}

  @Get('info')
  async getUserInfo(@Userdoc() userdoc: IAuthUser) {
    const user = this.userClient.send<User, IAuthUser>({ cmd: EnumMessagePattern.GET_USER_BY_UUID }, userdoc);

    return this.validateRespone(user, new UnauthorizedException());
  }

  @Put('update')
  async updateUser(@Userdoc() userdoc: IAuthUser, @Body() userDto: UpdateUserDto) {
    const preparedUserDto: UpdateUserDto = { ...userDto, Uuid: userdoc.Uuid, Role: userdoc.Role };
    const user = this.userClient.send<User, UpdateUserDto>({ cmd: EnumMessagePattern.UPDATE_USER }, preparedUserDto);

    return this.validateRespone(user, new UnauthorizedException());
  }

  private async validateRespone<T>(response: Observable<T>, exception: HttpException) {
    await response.forEach((_response) => {
      if (!_response) throw exception;
    });

    return response;
  }
}
