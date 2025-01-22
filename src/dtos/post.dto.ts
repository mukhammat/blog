import { IsString, IsEmail, MinLength, MaxLength, isString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsString()
  @MaxLength(200, {message: "Max length for message 200 char"})
  message: string | undefined;
}