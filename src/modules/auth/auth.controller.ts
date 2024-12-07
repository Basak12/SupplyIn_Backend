import {Body, Controller, Post, Get, UseGuards, UnauthorizedException, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {User} from "../user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userData: Partial<User>) {
        try {
            const { name, email, password } = userData;

            if (!name || !email || !password) {
                throw new HttpException('Name, email, and password are required fields.', HttpStatus.BAD_REQUEST);
            }

            return await this.authService.register(userData);
        } catch (error) {
            throw new HttpException(
                `Failed to create user: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('login')
    async login(@Body() loginData: { email: string; password: string }) {
        const { email, password } = loginData;

        console.log('login data', loginData);

        try {
            const user = await this.authService.validateUser(email, password);
            return this.authService.login(user);
        } catch (error) {
            console.log('error', error);
            throw new UnauthorizedException('Invalid credentials');
        }
    }


    @UseGuards(JwtStrategy)
    @Get('protected-route')
    getProtectedRoute() {
        return { message: 'This is a protected route' };
    }
}
