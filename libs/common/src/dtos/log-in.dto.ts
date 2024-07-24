import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateLogInDTO extends PartialType(CreateUserDto) {
  @ApiProperty()
  @Min(5)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @Min(8)
  password: string;
}
