import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsString, IsUrl, Max } from "class-validator";

export class CreateMovieDto {
  @ApiProperty({
    description: 'Title of the movie',
    type: String,
    example: 'Inception',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiPropertyOptional({
    description: 'Release year of the movie',
    type: Number,
    example: new Date().getFullYear(),
    required: false,
  })
  @IsInt()
  @Optional()
  @Max(new Date().getFullYear())
  releaseYear?: number;


  @ApiPropertyOptional({
    description: 'URL of the movie poster image',
    type: String,
    example: 'https://example.com/inception.jpg',
    required: false,
  })
  @IsUrl()
  @Optional()
  imageUrl?: string;


  @ApiProperty({
    description: 'Array of actor IDs associated with the movie',
    type: [String],
    example: ['fa603330-5a61-45cb-bd4b-82dbf24c523b', 'd1f1c1e2-3c4b-4f5a-9f6e-7a8b9c0d1e2f'],
    required: true,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  actorsIds: string[];
}
