import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IAuthUser, UserGuard } from '@/libs/common/src';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseSerialisation } from '@/libs/common/src/decorators/ResponseSerialisation.decorator';

@ResponseSerialisation
@UseGuards(UserGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get-user-by-uuid' })
  async getUserByUid(@Payload() { Uuid }: IAuthUser) {
    return await this.userService.getUserByUid(Uuid);
  }
}
