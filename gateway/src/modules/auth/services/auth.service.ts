import { Injectable } from '@nestjs/common';
import { LogInDTO } from '../../common/dtos/logIn.dto';

@Injectable()
export class AuthService {
  logIn(data: LogInDTO) {
    return data;
  }
}
