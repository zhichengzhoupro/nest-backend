import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import UserRepository from "./user.repository";
import * as config from 'config';
import {JwtPayload} from "./jwt-payload.interface";
import {UserEntity} from "./user.entity";


const jwtConfig = config.get("jwt");

@Injectable()
export default class JwtStrategy  extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
        });
    }

    async  validate(payload : JwtPayload): Promise<UserEntity> {
        const {username} = payload;

        const user =  await this.userRepository.findOne({username});

        if(!user) {
            throw new UnauthorizedException("Not authorized");
        }
        return user;
    }
}