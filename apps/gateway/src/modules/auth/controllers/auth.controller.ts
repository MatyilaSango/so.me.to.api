import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateLogInDTO } from '../../common/dtos/log-in.dto';
import { ValidateBodyGuard } from '../guards/ValidateBody.guard';
import { CreatePostUserDto } from '../../common/dtos/sign-up.dto';
import { CreateForgotPasswordDto } from '../../common/dtos/forgot-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { APP_MICROSERVICES } from '@/libs/common/src';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(APP_MICROSERVICES.AUTH_MICROSERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidateBodyGuard)
  logIn(@Body() logInDto: CreateLogInDTO) {
    return this.authClient.send({ cmd: 'login' }, logInDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(ValidateBodyGuard)
  signUp(@Body() signUpDto: CreatePostUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidateBodyGuard)
  forgotPassword(@Body() forgotPasswordDto: CreateForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
