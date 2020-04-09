import {Controller, Get, Post} from '@nestjs/common';
import AuthRequsetUserDto from "./dto/auth-requset-user.dto";

@Controller('auth')
export class AuthController {

    @Post('/signin')
    signIn(authUserDto: AuthRequsetUserDto): Promise<AuthRequsetUserDto> {
        return null;
    }
}
