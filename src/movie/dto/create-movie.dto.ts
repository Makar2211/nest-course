import { Optional } from "@nestjs/common";
import { IsArray, IsInt, IsNotEmpty, IsString, IsUrl, Max } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

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
