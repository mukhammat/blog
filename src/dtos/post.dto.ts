import { IsString, IsEmail, MinLength, MaxLength, isString, IsInt } from 'class-validator';

export class CreateDto {
  @IsString()
  @MaxLength(200, {message: "Max length for message 200 char"})
  message: string | undefined;

  @IsInt()
  @MinLength(1, { message: 'Must be minimum at least 1 character' })
  userId?: number;
}