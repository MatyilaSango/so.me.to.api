import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostUserDto extends CreateUserDto {
  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  Password: string;
}
