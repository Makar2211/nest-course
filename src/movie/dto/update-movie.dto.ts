import { Optional } from "@nestjs/common";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max } from "class-validator";

export class UpdateMovieDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;


  @IsInt()
  @Optional()
  @Max(new Date().getFullYear())
  releaseYear?: number;

  @IsUrl()
  @Optional()
  imageUrl?: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  actorsIds: string[];
}