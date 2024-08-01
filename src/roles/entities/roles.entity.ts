import { User } from 'src/users/entities/users.entity';
import {
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from './user-roles.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор роли' })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'ADMIN', description: 'Значение роли' })
    value: string;

    @Column()
    @ApiProperty({
        example: 'Администратор системы',
        description: 'Описание роли',
    })
    description: string;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({
        name: 'userRoles',
        joinColumn: { name: 'roleId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    @ApiProperty({
        type: () => [User],
        description: 'Пользователи с данной ролью',
    })
    users: User[];

    @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
    @ApiProperty({
        type: () => [UserRoles],
        description: 'Связи пользователей и ролей',
    })
    userRoles: UserRoles[];
}
