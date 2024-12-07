import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            // Kullanıcı bulunamazsa UnauthorizedException fırlat
            throw new UnauthorizedException('No user found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Şifre eşleşmezse UnauthorizedException fırlat
            throw new UnauthorizedException('Incorrect password');
        }

        const { password: userPassword, ...result } = user;
        return result;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: User) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return this.userService.create({ ...user, password: hashedPassword });
    }
}
