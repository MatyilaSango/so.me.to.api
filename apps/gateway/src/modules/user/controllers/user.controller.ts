import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { APP_MICROSERVICES, IAuthUser, UserGuard, User } from '@/libs/common/src';
import { Userdoc } from '@/libs/common/src/decorators/user.decorator';
import { UpdateUserDto } from '@/libs/common/src/dtos/user.dto';
import { EnumMessagePattern } from '@/libs/common/src/types/enums/message-pattern.enum';
import { validateMicroserviceResponse } from '@/libs/common/src/helpers/responseValidator.helper';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(APP_MICROSERVICES.USER_MICROSERVICE) private readonly userClient: ClientProxy) {}

  @Get('info')
  async getUserInfo(@Userdoc() userdoc: IAuthUser) {
    const user = this.userClient.send<User, IAuthUser>({ cmd: EnumMessagePattern.GET_USER_BY_UUID }, userdoc);

    return validateMicroserviceResponse(user, new UnauthorizedException());
  }

  @Put('update')
  async updateUser(@Userdoc() userdoc: IAuthUser, @Body() userDto: UpdateUserDto) {
    const preparedUserDto: UpdateUserDto = { ...userDto, Uuid: userdoc.Uuid, Role: userdoc.Role };
    const user = this.userClient.send<User, UpdateUserDto>({ cmd: EnumMessagePattern.UPDATE_USER }, preparedUserDto);

    return validateMicroserviceResponse(user, new UnauthorizedException());
  }
}
