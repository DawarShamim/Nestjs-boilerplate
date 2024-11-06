import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number) // ensures the parameter is treated as a number
  @IsPositive() // ensures the number is positive
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number) // ensures the parameter is treated as a number
  @IsPositive() // ensures the number is positive
  readonly limit?: number;
}
