import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { CreateFullUserDto } from '@/libs/common/src/dtos/user.dto';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { IAuthUser, IJwtToken } from '@/libs/common/src';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @MessagePattern({ cmd: 'login-by-username-and-password' })
  async loginloginByUsernameAndPassword(
    @Payload() createLogInDTO: CreateLogInDTO,
  ): Promise<IJwtToken | null> {
    const userPayload: IAuthUser | null =
      await this.authService.loginByUsernameAndPassword(createLogInDTO);

    if (!userPayload) return null;

    return {
      accessToken: this.jwtService.sign(userPayload),
      expiresIn: this.configService.get<string>('keys.token.expiry.access'),
    };
  }

  // This needs to be moved to user microservice
  @MessagePattern({ cmd: 'get-user-by-uuid' })
  async getUserByUid(@Payload() userDto: CreateFullUserDto) {
    return await this.authService.getUserByUid(userDto);
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Payload() postDto: CreatePostUserDto) {
    return await this.authService.postUser(postDto);
  }
}
