import { AuthenticatedGuard } from './guard/authenticated.guard';
import { GetUserId } from './decorators/get-user-id.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { Request } from 'express';
import {
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from 'src/global/types';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
  //   return this.authService.login(loginDto);
  // }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Req() req: Request, @Body() loginDto: LoginDto): LoginResponseDto {
    // @ts-ignore
    return req.user;
  }

  @Get('protected')
  async protected(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@GetUserId() userId: number) {
    return this.authService.logout(userId);
  }

  // @Public()
  // @UseGuards(RefreshTokenGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('refresh')
  // async refreshTokens(
  //   @GetUserId() userId: number,
  //   @GetUser('refresh_token') refresh_token: string,
  // ) {
  //   return this.authService.refreshTokens(userId, refresh_token);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmail(): Promise<VerifyEmailResponse> {
    return this.authService.verifyEmail();
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(
    @Param('email') email: string,
  ): Promise<ForgotPasswordResponse> {
    return this.authService.forgotPassword(email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    resetPasswordToken: string,
    newPassword: string,
  ): Promise<ResetPasswordResponse> {
    return this.authService.resetPassword(resetPasswordToken, newPassword);
  }
}
