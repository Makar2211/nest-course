import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateTaskDto {

  @IsString({ message: 'Title must be a string' })
  @Length(3, 15, { message: 'Title must be between 3 and 15 characters' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;


  @IsBoolean({ message: 'Status must be a boolean value' })
  completed: boolean;



}