import {Body, Controller, Get, Post, UseGuards, ValidationPipe, Request, Param, ParseIntPipe} from '@nestjs/common';
import AuthRequsetUserDto from "./dto/auth-requset-user.dto";
import {UserService} from "./service/user.service";
import AuthResponseUserDto from "./dto/auth-response-user.dto";
import SignUpRequestDto from "./dto/sign-up-request.dto";
import {UserEntity} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get-user.decorator";

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authUserDto: AuthRequsetUserDto): Promise<AuthResponseUserDto> {
        return this.userService.signIn(authUserDto);
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpRequestDto: SignUpRequestDto): Promise<UserEntity> {
        return this.userService.signUp(signUpRequestDto);
    }

    @Get('/current')
    @UseGuards(AuthGuard())
    getUserInfo(@GetUser() user:UserEntity) {
        return user;
    }

    @Get('/edit/:id')
    @UseGuards(AuthGuard())
    getUserById(@Param('id', ParseIntPipe)id: number) {
        return this.userService.getUserById(id);
    }

    @Get('/list')
    @UseGuards(AuthGuard())
    getUsers(@Request() req) {
        return this.userService.getUsers()
    }

    @Get('/signout')
    @UseGuards(AuthGuard())
    async signOut(@Request() req) {
        await req.logout();
    }
}
