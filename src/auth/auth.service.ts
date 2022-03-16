import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import {
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from 'src/global/types';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const hashedPassword = user.password;
      const passwordMatches = await bcrypt.compare(password, hashedPassword);

      if (passwordMatches) {
        const { password, ...rest } = user;
        return rest;
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    } else {
      throw new UnauthorizedException(`User with email ${email} found`);
    }
  }
  verifyEmail():
    | import('src/global/types').VerifyEmailResponse
    | PromiseLike<import('src/global/types').VerifyEmailResponse> {
    throw new Error('Method not implemented.');
  }
  resetPassword(
    resetPasswordToken: string,
    newPassword: string,
  ): Promise<ResetPasswordResponse> {
    throw new Error('Method not implemented.');
  }
  forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    throw new Error('Method not implemented.');
  }
  // async refreshTokens(userId: number, refresh_token: string) {
  //   const user = await this.userService.findOne(userId);

  //   if (user) {
  //     if (user.hashedRefreshToken) {
  //       const refreshTokenMatches = await bcrypt.compare(
  //         refresh_token,
  //         user.hashedRefreshToken,
  //       );
  //       if (refreshTokenMatches) {
  //         const { access_token, refresh_token } = await this.generateJwtTokens(
  //           user,
  //         );
  //         return { access_token, refresh_token };
  //       } else {
  //         throw new UnauthorizedException("Refresh token doesn't match");
  //       }
  //     } else {
  //       throw new UnauthorizedException('No refresh token in database');
  //     }
  //   } else {
  //     throw new UnauthorizedException('User doesnt exist');
  //   }
  // }

  async logout(userId: number) {
    await this.userService.update(userId, {
      hashedRefreshToken: null,
    });
    return { message: 'Logged out.' };
  }
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({ email: email, password: hashedPassword });
  }

  // async login(loginDto: LoginDto): Promise<LoginResponse> {
  //   const { email, password } = loginDto;

  //   const user = await this.userService.findByEmail(email);

  //   if (user) {
  //     const hashedPassword = user.password;
  //     const passwordMatches = await bcrypt.compare(password, hashedPassword);

  //     if (passwordMatches) {
  //       const { access_token, refresh_token } = await this.generateJwtTokens(
  //         user,
  //       );
  //       this.updateHashedRefreshToken(user.id, refresh_token);

  //       return { access_token: access_token, refresh_token: refresh_token };
  //     } else {
  //       throw new UnauthorizedException('Invalid Credentials');
  //     }
  //   } else {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }

  //   // return this.userService.findByEmail(ema)
  // }
  async updateHashedRefreshToken(userId: number, refresh_token: string) {
    const hashedRefreshToken = await this.hashData(refresh_token);
    this.userService.update(userId, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  hashData(data: any) {
    return bcrypt.hash(data, 10);
  }

  async generateJwtTokens(user: User) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '1w',
    });
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  //   async validateUser(username: string, pass: string): Promise<any> {
  //     const user = await this.userService.findByEmail(username);
  //     if (user && user.password === pass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  //   async login(user: any) {
  //     const payload = { username: user.username, sub: user.userId };
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   }
}
