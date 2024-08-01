import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Columns } from 'src/columns/entities/columns.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор задачи' })
    id: number;

    @ApiProperty({ example: 'Task 1', description: 'Название задачи' })
    @Column()
    title: string;

    @ApiProperty({
        example: 'Task description',
        description: 'Описание задачи',
    })
    @Column()
    description: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'Дата создания задачи' })
    createdAt: Date;

    @ApiProperty({ example: 1, description: 'Позиция задачи в колонке' })
    @Column({ unique: true })
    position: number;

    @ManyToOne(() => Columns, (column) => column.tasks)
    @ApiProperty({
        type: () => Columns,
        description: 'Колонка, к которой относится задача',
    })
    column: Columns;
}
