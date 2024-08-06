import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  FirstName: string;

  @ApiProperty()
  LastName: string;

  @ApiProperty()
  Email: string;

  @ApiProperty()
  Username: string;

  @ApiProperty()
  Role: string;

  [key: string]: any;
}

export class CreateFullUserDto extends CreateUserDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  Uuid: string;
}
