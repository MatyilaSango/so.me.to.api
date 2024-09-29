import {
  Body,
  Controller,
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
import { APP_MICROSERVICES, IJwtToken } from '@/libs/common/src';
import { Roles } from '@/libs/common/src/types/enums/roles.enum';
import { EnumMessagePattern } from '@/libs/common/src/types/enums/message-pattern.enum';
import { validateMicroserviceResponse } from '@/libs/common/src/helpers/responseValidator.helper';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(APP_MICROSERVICES.AUTH_MICROSERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  @Post('log-in')
  async logIn(@Body() logInDto: CreateLogInDTO) {
    const jwtToken = this.authClient.send<IJwtToken | null, CreateLogInDTO>(
      { cmd: EnumMessagePattern.LOG_IN_BY_USERNAME_AND_PASSWORD },
      logInDto,
    );

    return validateMicroserviceResponse(jwtToken, new UnauthorizedException());
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: CreatePostUserDto) {
    const response = this.authClient.send<boolean, CreatePostUserDto>(
      { cmd: EnumMessagePattern.POST_USER },
      { Role: Roles.CLIENT, ...signUpDto },
    );

    await validateMicroserviceResponse(response, new UnprocessableEntityException({ message: 'Can not process!' }));

    return { message: 'User successfully created!' };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordDto: CreateForgotPasswordDto) {
    throw new Error('Not implemented!');
  }
}
