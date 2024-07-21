import { Injectable } from '@nestjs/common';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { CreateForgotPasswordDto } from '@/libs/common/src/dtos/forgot-password.dto';

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
