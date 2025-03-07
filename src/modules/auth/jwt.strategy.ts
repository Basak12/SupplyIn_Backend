import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard, PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {UserService} from "../user/user.service";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Kullanıcı bulunamadı');
        }
        return user;
    }


    async validateUser(payload: any) {
        return { id: payload.sub, email: payload.email };
    }

    async validateToken(payload: any) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
}


