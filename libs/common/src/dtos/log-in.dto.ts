import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateLogInDTO {
  @ApiProperty()
  @MinLength(2)
  @IsNotEmpty()
  Username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  Password: string;
}
