import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Columns } from 'src/columns/entities/columns.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(Columns)
        private columnsRepository: Repository<Columns>
    ) {}

    async createTask(
        createTaskDto: CreateTaskDto,
        columnId: number,
        user: User
    ): Promise<Task> {
        // Проверка прав доступа
        const column = await this.columnsRepository.findOne({
            where: { id: columnId, project: { user: { id: user.id } } },
        });

        if (!column) {
            throw new UnauthorizedException();
        }

        // Получение максимального значения позиции
        const result = await this.tasksRepository
            .createQueryBuilder('task')
            .select('MAX(task.position)', 'max')
            .where('task.columnId = :columnId', { columnId })
            .getRawOne();

        const maxPosition = result.max || 0;

        // Создание новой задачи
        const task = this.tasksRepository.create({
            ...createTaskDto,
            column,
            position: maxPosition + 1,
        });

        await this.tasksRepository.save(task);
        return task;
    }

    async getTasks(columnId: number, user: User): Promise<Task[]> {
        const column = await this.columnsRepository.findOne({
            where: { id: columnId, project: { user: { id: user.id } } },
        });

        if (!column) {
            throw new UnauthorizedException();
        }

        return this.tasksRepository.find({ where: { column } });
    }

    async getTaskById(
        columnId: number,
        taskId: number,
        user: User
    ): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: {
                id: taskId,
                column: { id: columnId, project: { user: { id: user.id } } },
            },
        });

        if (!task) {
            throw new UnauthorizedException();
        }

        return task;
    }

    async updateTask(
        columnId: number,
        taskId: number,
        updateTaskDto: UpdateTaskDto,
        user: User
    ): Promise<Task> {
        const task = await this.getTaskById(columnId, taskId, user);

        if (!task) {
            throw new NotFoundException();
        }

        Object.assign(task, updateTaskDto);
        await this.tasksRepository.save(task);
        return task;
    }

    async deleteTask(
        columnId: number,
        taskId: number,
        user: User
    ): Promise<void> {
        const task = await this.getTaskById(columnId, taskId, user);

        if (!task) {
            throw new NotFoundException();
        }

        await this.tasksRepository.remove(task);
    }
}
