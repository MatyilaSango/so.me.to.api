import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class CreateLogInDTO extends PartialType(CreateUserDto) {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
