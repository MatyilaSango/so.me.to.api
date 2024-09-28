import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateLogInDTO {
  @ApiProperty()
  @MinLength(2)
  @IsNotEmpty()
  Username: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  Password: string;
}
