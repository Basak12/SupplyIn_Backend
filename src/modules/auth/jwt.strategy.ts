import { Injectable } from '@nestjs/common';
import {AuthGuard, PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'yourSecretKey',
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email }; // Kullanıcı bilgilerini döndür
    }
}


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

