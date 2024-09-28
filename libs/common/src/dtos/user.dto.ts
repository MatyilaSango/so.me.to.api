import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(2)
  @IsNotEmpty()
  FirstName: string;

  @ApiProperty()
  @MinLength(2)
  @IsNotEmpty()
  LastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  Username: string;

  @ApiProperty()
  Role: string;
}

export class CreateFullUserDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  Id: number;

  @ApiProperty()
  @Length(36)
  @IsNotEmpty()
  Uuid: string;
}

export class UpdateUserDto extends PartialType<CreateFullUserDto>(CreateFullUserDto, { skipNullProperties: true }) {}
