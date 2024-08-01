import { Columns } from 'src/columns/entities/columns.entity';
import { User } from 'src/users/entities/users.entity';
import {
    Entity,
    Column,
    ManyToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор проекта',
    })
    id: number;

    @Column()
    @ApiProperty({ example: 'Project Name', description: 'Название проекта' })
    name: string;

    @Column()
    @ApiProperty({
        example: 'Project Description',
        description: 'Описание проекта',
    })
    description: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'Дата создания проекта' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.projects)
    @ApiProperty({
        type: () => User,
        description: 'Пользователь, владелец проекта',
    })
    user: User;

    @OneToMany(() => Columns, (columns) => columns.project)
    @ApiProperty({ type: () => [Columns], description: 'Колонки проекта' })
    columns: Columns[];
}
