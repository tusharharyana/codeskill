import { IsArray, IsInt, IsOptional, IsString, MaxLength, Max, Min } from 'class-validator';

export class CreateGameAttemptDto {
  @IsString()
  @MaxLength(64)
  gameId: string;

  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @IsInt()
  @Min(1)
  @Max(20)
  totalRounds: number;

  @IsInt()
  @Min(0)
  @Max(20)
  correctRounds: number;

  @IsInt()
  @Min(0)
  @Max(7200)
  durationSeconds: number;

  @IsOptional()
  @IsArray()
  responses?: unknown[];
}
