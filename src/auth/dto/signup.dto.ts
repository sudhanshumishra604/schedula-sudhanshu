import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}