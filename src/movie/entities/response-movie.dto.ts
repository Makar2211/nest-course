import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Genre } from "prisma/generated/prisma/enums";

export class MoviePosterDto {
  @ApiProperty({ example: 'b1a2f3d4-...', type: String })
  id!: string;

  @ApiProperty({ example: 'https://cdn.example.com/poster.jpg', type: String })
  url!: string;


}

export class PosterCreateResponseDto extends MoviePosterDto {
  @ApiProperty({ example: '2025-01-01T12:00:00.000Z', type: Date })
  createdAt!: Date;
  @ApiProperty({ example: '2025-01-01T12:00:00.000Z', type: Date })
  updatedAt!: Date;
}

export class ActorDto {
  @ApiProperty({ example: 'fa603330-5a61-45cb-bd4b-82dbf24c523b', type: String })
  id!: string;

  @ApiProperty({ example: 'Tom Hanks', type: String })
  name!: string;
}

export class MovieResponseDto {
  @ApiProperty({ example: 'fa603330-5a61-45cb-bd4b-82dbf24c523b' })
  id!: string;

  @ApiProperty({ example: 'Лучший фильм' })
  title!: string;

  @ApiPropertyOptional({ example: 'Описание фильма', nullable: true })
  description?: string | null;

  @ApiPropertyOptional({ example: 2024, nullable: true })
  releaseYear?: number | null;

  @ApiProperty({
    description: 'Rating as number. If stored as Prisma Decimal, convert to number before returning',
    example: 9.5,
    type: Number,
  })
  rating!: number;

  @ApiProperty({ example: true, type: Boolean })
  isAvailable!: boolean;

  @ApiProperty({ example: 'ACTION', enum: Genre, default: Genre.ACTION })
  genre!: Genre;

  @ApiProperty({ example: '2025-01-01T12:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-01-02T12:00:00.000Z' })
  updatedAt!: Date;
}

export class MovieResponseWrapperDto {
  @ApiProperty({ example: 'success' })
  status!: 'success' | 'error';

  @ApiProperty({ type: () => MovieResponseDto })
  data!: MovieResponseDto;
}

export class MovieCreateDataDto extends MovieResponseDto {
  @ApiPropertyOptional({ type: () => [PosterCreateResponseDto] })
  @Type(() => PosterCreateResponseDto)
  posters?: PosterCreateResponseDto[] | null;

  @ApiPropertyOptional({ type: () => [ActorDto] })
  @Type(() => ActorDto)
  actors?: ActorDto[] | null;
}

export class MovieCreateResponseDto {
  @ApiProperty({ example: 'success' })
  status!: 'success' | 'error';

  @ApiProperty({ type: () => MovieCreateDataDto })
  data!: MovieCreateDataDto;
}

export class MovieGetAllDataDto extends MovieResponseDto {
  @ApiPropertyOptional({ type: () => [ActorDto] })
  @Type(() => ActorDto)
  actors?: ActorDto[] | null;
}

export class MovieGetAllResponseDto {
  @ApiProperty({ example: 'success' })
  status!: 'success' | 'error';

  @ApiProperty({ type: () => MovieGetAllDataDto })
  data!: MovieGetAllDataDto;
}

export class MovieUpdateResponseDto {
  @ApiProperty({ example: 'success' })
  status!: 'success' | 'error';

  @ApiProperty({ type: () => MovieResponseDto })
  data!: MovieResponseDto;
}

