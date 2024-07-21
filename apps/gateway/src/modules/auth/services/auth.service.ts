import { Injectable } from '@nestjs/common';
import { CreatePostUserDto } from '../../common/dtos/sign-up.dto';
import { CreateLogInDTO } from '../../common/dtos/log-in.dto';
import { CreateForgotPasswordDto } from '../../common/dtos/forgot-password.dto';

@Injectable()
export class AuthService {
  logIn(data: CreateLogInDTO) {
    return data;
  }

  signUp(data: CreatePostUserDto) {
    return data;
  }

  forgotPassword(data: CreateForgotPasswordDto) {
    return data;
  }
}
