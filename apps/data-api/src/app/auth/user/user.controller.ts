import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

import { UserInfo, User } from '@nx-repo/data';
import { InjectToken, Token } from '../token.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserInfo[]> {
    return this.userService.getAll();
  }

  // this method should precede the general getOne method, otherwise it never matches
  @Get('self')
  async getSelf(@InjectToken() token: Token) {
    console.log(token)
    const result = await this.userService.getOne(token.id);
    return result;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }
}
