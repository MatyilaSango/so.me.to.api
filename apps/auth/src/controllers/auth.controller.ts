import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async logIn(@Payload() createLogInDTO: CreateLogInDTO) {
    return await this.authService.login(createLogInDTO);
  }
}
