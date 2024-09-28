import { PartialType } from '@nestjs/mapped-types';
import { CreateFullUserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateForgotPasswordDto extends PartialType(CreateFullUserDto) {
  @ApiProperty()
  @MinLength(2)
  @IsNotEmpty()
  Username: string;
}
