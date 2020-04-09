import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "./user.entity";

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
    signIn = async (authRequsetUserDto): Promise<UserEntity> => {
        const {username, password} = authRequsetUserDto;
        const user = await this.findOne({username});

        return user;
    }

}