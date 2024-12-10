import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id/purchases')
  async getUserPurchases(@Param('id') id: string) {
    const purchases = await this.userService.getUserWithPurchases(id);
    return { purchases };
  }

  @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        return { user };
    }

  @Post()
  async create(@Body() userData: Partial<User>) {
    try {
      const { email, password, name, surname } = userData;

      if (!email || !password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }

      return await this.userService.createUser(email, password, name, surname)
    } catch (error) {
      throw new HttpException(
          `Failed to create user: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
