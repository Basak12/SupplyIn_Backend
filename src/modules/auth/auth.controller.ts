import { Body, Controller, Post, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userData: any) {
        return this.authService.register(userData);
    }

    @Post('login')
    async login(@Body() loginData: { email: string; password: string }) {
        const { email, password } = loginData;

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
