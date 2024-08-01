import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Project } from 'src/projects/entities/projects.entity';
import { Task } from 'src/tasks/entities/tasks.entity';

@Entity()
export class Columns {
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор колонки',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'To Do', description: 'Название колонки' })
    @Column()
    name: string;

    @ApiProperty({ example: 1, description: 'Позиция колонки в проекте' })
    @Column({ unique: true })
    position: number;

    @ApiProperty({
        type: () => Project,
        description: 'Проект, к которому относится колонка',
    })
    @ManyToOne(() => Project, (project) => project.columns)
    project: Project;

    @ApiProperty({ type: () => [Task], description: 'Задачи в колонке' })
    @OneToMany(() => Task, (task) => task.column, { cascade: true })
    tasks: Task[];
}
