import { BadRequestException, Injectable } from '@nestjs/common';

const USER = {
  username: 'user',
  password: 'password'
}

@Injectable()
export class AppService {

  getHello(): string {
    return 'welcome to api...';
  }

  async login(user: any) {
    const { username, password } = user
    if (USER.password !== password || USER.username !== username) throw new BadRequestException('invalid credentials')
    return 'success'
  }
}
