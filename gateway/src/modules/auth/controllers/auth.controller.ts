import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LogInDTO } from '@/src/modules/common/dtos/logIn.dto';
import { ValidateBodyGuard } from '../guards/ValidateBody.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidateBodyGuard)
  logIn(@Body() logInDto: LogInDTO) {
    return this.authService.logIn(logInDto);
  }
}
