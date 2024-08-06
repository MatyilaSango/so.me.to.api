import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { CreateForgotPasswordDto } from '@/libs/common/src/dtos/forgot-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { APP_MICROSERVICES } from '@/libs/common/src';
import { User } from '@/libs/common/src/database/user/entities/user.entity';
import { Observable } from 'rxjs';
import { User as UserDoc } from '@/libs/common/src/decorators/user.decorator';
import { CreateFullUserDto } from '@/libs/common/src/dtos/user.dto';
import { Roles } from '@/libs/common/src/types/enums/roles.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(APP_MICROSERVICES.AUTH_MICROSERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  @Post('log-in')
  async logIn(@Body() logInDto: CreateLogInDTO) {
    const user: Observable<User | null> = this.authClient.send(
      { cmd: 'login-by-username-and-password' },
      logInDto,
    ) as Observable<User | null>;

    await user.forEach((_user) => {
      if (!_user) throw new UnauthorizedException();
    });

    return user;
  }

  @Get('get-user')
  async getUser(@UserDoc() requestUser: CreateFullUserDto) {
    const user = this.authClient.send(
      { cmd: 'get-user-by-uuid' },
      requestUser,
    ) as Observable<User>;

    await user.forEach((_user) => {
      if (!_user) throw new UnauthorizedException();
    });

    return user;
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: CreatePostUserDto) {
    const response = this.authClient.send<boolean, CreatePostUserDto>(
      { cmd: 'post-user' },
      { Role: Roles.CLIENT, ...signUpDto },
    );

    await response.forEach((res) => {
      if (!res)
        throw new UnprocessableEntityException({ message: 'Can not process!' });
    });

    return { message: 'User successfully created!' };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDto: CreateForgotPasswordDto) {
    throw new Error('Not implemented!');
  }
}
