import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { CreateLogInDto } from '@/libs/common/src/dtos/log-in.dto';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { IAuthUser, IJwtToken } from '@/libs/common/src';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnumMessagePattern } from '@/libs/common/src/types/enums/message-pattern.enum';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @MessagePattern({ cmd: EnumMessagePattern.LOG_IN_BY_USERNAME_AND_PASSWORD })
  async loginloginByUsernameAndPassword(@Payload() createLogInDTO: CreateLogInDto): Promise<IJwtToken | null> {
    const userPayload: IAuthUser | null = await this.authService.loginByUsernameAndPassword(createLogInDTO);

    if (!userPayload) return null;

    return {
      accessToken: this.jwtService.sign(userPayload),
      expiresIn: this.configService.get<string>('keys.token.expiry.access'),
    };
  }

  @MessagePattern({ cmd: EnumMessagePattern.POST_USER })
  async postUser(@Payload() postDto: CreatePostUserDto) {
    return await this.authService.postUser(postDto);
  }
}
