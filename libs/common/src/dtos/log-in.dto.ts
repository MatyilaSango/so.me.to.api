import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLogInDTO {
  @ApiProperty()
  @IsNotEmpty()
  Username: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
