
import {IsEmail, IsString, MinLength} from "class-validator";

export default class AuthRequsetUserDto {
    @IsEmail()
    @IsString()
    username: string;

    @MinLength(8)
    password: string;
}