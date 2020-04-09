import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import UserRepository from "../user.repository";
import AuthRequsetUserDto from "../dto/auth-requset-user.dto";
import AuthResponseUserDto from "../dto/auth-response-user.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    signIn = async (authRequsetUserDto: AuthRequsetUserDto): Promise<AuthResponseUserDto> => {
        const user = await this.userRepository.signIn(authRequsetUserDto);

        return null;
    }
}
