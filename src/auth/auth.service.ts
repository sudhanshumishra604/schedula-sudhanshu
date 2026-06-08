import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService,) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.usersService.findByEmail(
      signupDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.usersService.create(signupDto);
  }


  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(
      loginDto.email,
    );

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}