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

  @Post()
  async create(@Body() userData: Partial<User>) {
    try {
      return await this.userService.create(userData);
    } catch (error) {
      throw new HttpException(
        `Failed to create user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}