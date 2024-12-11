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
        private readonly configService: ConfigService,  // ConfigService kullanarak JWT_SECRET alıyoruz
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Token'ı Authorization header'ından al
            secretOrKey: configService.get('JWT_SECRET'),  // JWT Secret burada kullanılıyor
            ignoreExpiration: false,  // Token'ın süresi dolmuşsa geçersiz sayılacak
        });
    }

    async validate(payload: any) {
        console.log('Payload doğrulandı:', payload); // Debug log
        const user = await this.userService.findById(payload.sub); // Kullanıcıyı kontrol et
        if (!user) {
            throw new UnauthorizedException('Kullanıcı bulunamadı'); // Kullanıcı yoksa hata
        }
        return user; // Kullanıcı bilgilerini döndür
    }


    async validateUser(payload: any) {
        return { id: payload.sub, email: payload.email }; // Kullanıcı bilgilerini döndür
    }

    async validateToken(payload: any) {
        const user = await this.userService.findById(payload.sub); // Token'daki 'sub' kullanılarak kullanıcıyı bul
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;  // Eğer kullanıcı geçerliyse, kullanıcı bilgileri döner
    }
}


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        console.log('JwtAuthGuard çalıştı'); // çalıştı
        return super.canActivate(context);
    }
}


