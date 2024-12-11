import {HttpException, Injectable, UnauthorizedException, HttpStatus} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async register(userData: Partial<User>) {
        const { email, password, name, surname } = userData;

        if (!email || !password || !name || !surname) {
            throw new HttpException('All fields (email, password, name) are required', HttpStatus.BAD_REQUEST);
        }
        return this.userService.createUser(email, password, name, surname);
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('No user found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Incorrect password');
        }

        const { password: userPassword, ...result } = user;
        return result;
    }

}
