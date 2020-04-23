import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './service/user.service';
import UserRepository from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as config from 'config';
import JwtStrategy from "./jwt.strategy";

const jwtConfig = config.get("jwt");

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy:'jwt'
        }),
        JwtModule.register({
            secret : process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: {
                expiresIn: 3600
            }
        }),
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, UserService]
})
export class UserModule {
}
