import { IsString, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
}

export class SignUpDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsString()
  name: string | undefined;
}
