import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { CreateFullUserDto } from '@/libs/common/src/dtos/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login-by-username-and-password' })
  async loginloginByUsernameAndPassword(
    @Payload() createLogInDTO: CreateLogInDTO,
  ) {
    return await this.authService.loginByUsernameAndPassword(createLogInDTO);
  }

  @MessagePattern({ cmd: 'get-user-by-uid' })
  async getUserByUid(@Payload() userDto: CreateFullUserDto) {
    return await this.authService.getUserByUid(userDto);
  }
}
