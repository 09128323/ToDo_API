import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { Role } from 'src/roles/entities/roles.entity';
import { UserRoles } from 'src/roles/entities/user-roles.entity';
import { Project } from 'src/projects/entities/projects.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адрес' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: 'user12345', description: 'Пароль' })
    @Column()
    password: string;

    @ApiProperty({ type: () => [Project], description: 'Проекты пользователя' })
    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    @ApiProperty({ type: () => [UserRoles], description: 'Роли пользователя' })
    @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
    userRoles: UserRoles[];

    @ApiProperty({ type: () => [Role], description: 'Роли пользователя' })
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'UserRoles',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];
}
