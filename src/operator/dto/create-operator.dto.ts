import { RoleEnum } from './../../common/constants/app.constants';
import { IsString, IsEnum, IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOperatorDto {
  @ApiProperty({ description: 'First name of the operator' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name of the operator' })
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'Username of the operator' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Email of the operator' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the operator' })
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty({ description: 'Role of the operator', enum: RoleEnum })
  @IsEnum(RoleEnum)
  readonly role: RoleEnum;
}
