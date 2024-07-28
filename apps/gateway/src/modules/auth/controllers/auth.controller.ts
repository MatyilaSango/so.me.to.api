import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { CreateForgotPasswordDto } from '@/libs/common/src/dtos/forgot-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { APP_MICROSERVICES } from '@/libs/common/src';
import { users } from '@/libs/common/src/database/user/entities/user.entity';
import { Observable } from 'rxjs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(APP_MICROSERVICES.AUTH_MICROSERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  @Post('log-in')
  async logIn(@Body() logInDto: CreateLogInDTO) {
    const user: Observable<users | null> = this.authClient.send(
      { cmd: 'login' },
      logInDto,
    ) as Observable<users | null>;

    await user.forEach((_user) => {
      if (!_user) throw new UnauthorizedException();
    });

    return user;
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: CreatePostUserDto) {
    throw new Error('Not implemented!');
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDto: CreateForgotPasswordDto) {
    throw new Error('Not implemented!');
  }
}
