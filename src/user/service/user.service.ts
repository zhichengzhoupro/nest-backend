import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import UserRepository from "../user.repository";
import AuthRequsetUserDto from "../dto/auth-requset-user.dto";
import AuthResponseUserDto, {AuthResponseUser} from "../dto/auth-response-user.dto";
import SignUpRequestDto from "../dto/sign-up-request.dto";
import {UserEntity} from "../user.entity";
import {JwtPayload} from "../jwt-payload.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    signIn = async (authRequsetUserDto: AuthRequsetUserDto): Promise<AuthResponseUserDto> => {
        const user = await this.userRepository.signIn(authRequsetUserDto);

        const payload: JwtPayload = { username: user.username };
        const accessToken = this.jwtService.sign(payload);

        const authResponseUser: AuthResponseUser =  new AuthResponseUser();
        authResponseUser.id = user.id;
        authResponseUser.username = user.username;
        authResponseUser.avatar = user.avatar;
        authResponseUser.displayName = user.displayName;
        authResponseUser.role = user.role;

        return {user: authResponseUser, accessToken};
    };

    signUp = async (signUpRequestDto: SignUpRequestDto): Promise<UserEntity> => {
        return await this.userRepository.signUp(signUpRequestDto);
    };

    getUsers =  async () => {
        return await this.userRepository.find();
    };

    getUserById =  async (id: number) => {
        return await this.userRepository.findOne({id});
    };
}
