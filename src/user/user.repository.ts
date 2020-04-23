import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import SignUpRequestDto from "./dto/sign-up-request.dto";
import * as bcrypt from 'bcryptjs'
import {ConflictException, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {

    signIn = async (authRequsetUserDto): Promise<UserEntity> => {
        const {username, password} = authRequsetUserDto;
        const user = await this.findOne({username});
        if(!user) {
            throw new UnauthorizedException("No User Found");
        }
        if(!await this.validatePassword(password, user)) {
            console.log('i m here');
            throw new UnauthorizedException("Invalid Credentials");
        }
        return user;
    };

    signUp = async (signUpRequestDto: SignUpRequestDto): Promise<UserEntity> => {
        const {username, password, displayName} = signUpRequestDto;

        const user: UserEntity = new UserEntity();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.role = '003';
        user.displayName = displayName;
        user.password = await this.getHashPassword(password, user.salt);

        try {
            return await this.save(user);
        } catch (error) {
            if (parseInt(error.code) === 23505) {
                throw new ConflictException("User already exists");
            } else {
                throw new InternalServerErrorException();
            }

        }
    };

    async getHashPassword(password: string, salt: string) {
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(password: string, user: any): Promise<boolean>{
        const hash = await bcrypt.hash(password, user.salt);
        return hash == user.password;
    }
}