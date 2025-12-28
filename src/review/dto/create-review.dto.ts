import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateReviewDto {

  @IsString({ message: 'text must be a string' })
  @IsNotEmpty()
  text: string

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'raiting must be a number' })
  @Min(0)
  @Max(10)
  raiting: number

  @IsNotEmpty()
  @IsString({ message: 'movieId must be a string' })
  movieId: string

}