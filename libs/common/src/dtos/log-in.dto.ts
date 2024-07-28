import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateLogInDTO {
  @ApiProperty()
  @IsNotEmpty()
  // @IsString()
  // @Min(5)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  // @Min(8)
  password: string;
}
