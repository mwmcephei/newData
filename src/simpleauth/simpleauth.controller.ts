import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SimpleAuthService } from './simpleAuth.service';

export class UserDataDto {
  username: string;
  password: string;
}

@Controller('simpleAuth')
export class SimpleAuthController {
  constructor(private SimpleAuthService: SimpleAuthService) {}

  @Post('login')
  async login(@Body() userData: UserDataDto) {
    const success = await this.SimpleAuthService.login(
      userData.username,
      userData.password,
    );
    return {
      login: success,
    };
  }

  @Get('adduser')
  addUser() {
    return this.SimpleAuthService.addUser();
  }
}
