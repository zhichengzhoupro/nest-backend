export class AuthResponseUser {

    id: number;

    username: string;

    avatar: string;

    displayName: string;

    role: string;
}

export default class AuthResponseUserDto {
    accessToken: string;

    user: AuthResponseUser;
}

