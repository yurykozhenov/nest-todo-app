import { BadRequestException, Body, Controller, Post, Headers } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Credentials } from './credentials';

@Controller('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post()
  async getToken(@Body() credentials: Credentials,
                 @Headers('authorization') authHeader: string) {
    if (!credentials) {
      throw new BadRequestException();
    }

    const token = this.extractTokenFromAuthHeader(authHeader);

    return await this.authService.createToken(credentials, token);
  }

  private extractTokenFromAuthHeader(authHeader?: string): string {
    return authHeader ? authHeader.split('Bearer ')[1] : null;
  }
}
