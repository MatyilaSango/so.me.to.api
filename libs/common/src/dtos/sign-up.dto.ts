import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class CreatePostUserDto extends CreateUserDto {
  @ApiProperty()
  Password: string;
}
