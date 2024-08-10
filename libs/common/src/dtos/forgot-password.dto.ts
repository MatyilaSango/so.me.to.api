import { PartialType } from '@nestjs/mapped-types';
import { CreateFullUserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateForgotPasswordDto extends PartialType(CreateFullUserDto) {
  @ApiProperty()
  Username: string;
}
