import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({nullable: true})
    avatar: string;

    @Column({name: "display_name", nullable: true})
    displayName: string;

    @Column({nullable: true})
    role: string;

}
