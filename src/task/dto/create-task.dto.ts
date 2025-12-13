import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, IsUUID, Length, Matches, MinLength } from "class-validator";
import { StartWith } from "../decorators/task.decorator";

export enum TAGS {
  WORK = 'work',
  PERSONAL = 'personal',
  SHOPPING = 'shopping',
  OTHERS = 'others'
}

export class CreateTaskDto {

  @IsString()
  @Length(3, 15)
  @StartWith('Task')
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  completed: boolean;


  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;


  @IsInt({ message: 'Priority must be integer' })
  @IsPositive({ message: 'Priority must be 0 or higher number' })
  @IsOptional()
  priority: number;


  @IsArray({ message: 'Tags must be an array of strings' })
  @IsEnum(TAGS, { each: true, message: 'Invalid tag value' })
  @IsOptional()
  tags: string[];


  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, { message: 'Password must be include at least 1 number and capital letter ' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;


  @IsOptional()
  @IsUrl({ protocols: ['https', 'wss'], require_protocol: true, require_port: false, require_valid_protocol: true, host_whitelist: ['google.com'], host_blacklist: ['facebook.com'] }, { message: 'URL must be valid' })
  link: string;


  @IsOptional()
  @IsUUID('4', { message: 'ID must be a valid UUID v4' })
  userId: string;
}