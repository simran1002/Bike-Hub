import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBikeDto {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  type?: string;
}
