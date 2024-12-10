import { Strategy } from 'passport-jwt';
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validateUser(payload: any): Promise<{
        id: any;
        email: any;
    }>;
    validateToken(payload: any): Promise<import("../user/user.entity").User>;
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export {};
