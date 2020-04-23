import {IsEmail, IsString, MinLength} from "class-validator";

export default class SignUpRequestDto {
    @IsEmail()
    username: string;

    @MinLength(8)
    password: string;

    @IsString()
    displayName: string;


}