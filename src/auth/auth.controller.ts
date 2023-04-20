import {
   Controller, 
   HttpCode, 
   Post, 
   Put, 
   Get, 
   Delete, 
   UsePipes,
   ValidationPipe,
   Body
  } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh-token.dto';

/* login, getNewTokens */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }



  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshDto) {
    return this.authService.getNewTokens(dto)
  }



  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
}
