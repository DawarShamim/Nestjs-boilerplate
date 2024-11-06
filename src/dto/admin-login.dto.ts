import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({ description: 'Username of the operator' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Password of the operator' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'keep me log in' })
  @IsOptional()
  @IsBoolean()
  readonly keepMeLoggedIn: boolean;
}
