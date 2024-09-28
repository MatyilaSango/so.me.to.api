import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IAuthUser, UserGuard } from '@/libs/common/src';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseSerialisation } from '@/libs/common/src/decorators/ResponseSerialisation.decorator';
import { EnumMessagePattern } from '@/libs/common/src/types/enums/message-pattern.enum';
import { UpdateUserDto } from '@/libs/common/src/dtos/user.dto';

@ResponseSerialisation
@UseGuards(UserGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: EnumMessagePattern.GET_USER_BY_UUID })
  async getUserByUid(@Payload() { Uuid }: IAuthUser) {
    return await this.userService.getUserByUid(Uuid);
  }

  @MessagePattern({ cmd: EnumMessagePattern.UPDATE_USER })
  async updateUser(@Payload() user: UpdateUserDto) {
    return await this.userService.updateUser(user);
  }
}
