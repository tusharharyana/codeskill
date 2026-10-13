import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator';

export class SaveCognitiveGameDto {
  @IsString() @MaxLength(64) @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug: string;
  @IsString() @MaxLength(120) title: string;
  @IsOptional() @IsString() shortDescription?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() @MaxLength(32) color?: string;
  @IsOptional() @IsString() @MaxLength(16) icon?: string;
  @IsInt() @Min(15) @Max(7200) durationSeconds: number;
  @IsArray() rounds: Record<string, unknown>[];
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
