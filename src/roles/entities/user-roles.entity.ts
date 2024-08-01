import { User } from 'src/users/entities/users.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './roles.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserRoles {
    @PrimaryColumn()
    @ApiProperty({ example: 1, description: 'ID роли' })
    roleId: number;

    @PrimaryColumn()
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    userId: number;

    @ManyToOne(() => Role, (role) => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    @ApiProperty({ type: () => Role, description: 'Роль' })
    role: Role;

    @ManyToOne(() => User, (user) => user.userRoles)
    @JoinColumn({ name: 'userId' })
    @ApiProperty({ type: () => User, description: 'Пользователь' })
    user: User;
}
