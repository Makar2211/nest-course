import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max } from "class-validator";

export class UpdateMovieDto {

  @ApiPropertyOptional({
    example: 'Inception',
    description: 'Title of the movie',
    type: String
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;



  @ApiPropertyOptional({
    example: new Date().getFullYear(),
    description: 'Release year of the movie',
    type: Number
  })
  @IsInt()
  @Optional()
  @Max(new Date().getFullYear())
  releaseYear?: number;

  @ApiPropertyOptional({
    example: 'A mind-bending thriller about dreams within dreams.',
    description: 'Description of the movie',
    type: String
  })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'URL of the movie image',
    type: String
  })
  @IsUrl()
  @Optional()
  imageUrl?: string;

  @ApiProperty({
    example: ['fdb4f3f5-7451-4f60-9434-a31b28659739', '79a48dee-1031-4a01-8cc9-959ad18dcb6d'],
    description: 'Array of actor IDs associated with the movie',
    type: [String]
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  actorsIds: string[];
}