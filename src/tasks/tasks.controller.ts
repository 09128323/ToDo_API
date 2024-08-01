import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Put,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Task } from './entities/tasks.entity';

@ApiTags('Задачи')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post(':columnId')
    @ApiOperation({ summary: 'Создать новую задачу' })
    @ApiResponse({ status: 201, description: 'Задача создана', type: Task })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiParam({ name: 'columnId', description: 'ID колонки' })
    @ApiBody({ type: CreateTaskDto })
    async create(
        @Param('columnId') columnId: number,
        @Body() createTaskDto: CreateTaskDto,
        @Req() req
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, columnId, req.user);
    }

    @Get(':columnId')
    @ApiOperation({ summary: 'Получить все задачи колонки' })
    @ApiResponse({ status: 200, description: 'Список задач', type: [Task] })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiParam({ name: 'columnId', description: 'ID колонки' })
    async findAll(
        @Param('columnId') columnId: number,
        @Req() req
    ): Promise<Task[]> {
        return this.tasksService.getTasks(columnId, req.user);
    }

    @Get(':columnId/:taskId')
    @ApiOperation({ summary: 'Получить задачу по ID' })
    @ApiResponse({
        status: 200,
        description: 'Информация о задаче',
        type: Task,
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Задача не найдена' })
    @ApiParam({ name: 'columnId', description: 'ID колонки' })
    @ApiParam({ name: 'taskId', description: 'ID задачи' })
    async findOne(
        @Param('columnId') columnId: number,
        @Param('taskId') taskId: number,
        @Req() req
    ): Promise<Task> {
        return this.tasksService.getTaskById(columnId, taskId, req.user);
    }

    @Put(':columnId/:taskId')
    @ApiOperation({ summary: 'Обновить задачу' })
    @ApiResponse({ status: 200, description: 'Задача обновлена', type: Task })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Задача не найдена' })
    @ApiParam({ name: 'columnId', description: 'ID колонки' })
    @ApiParam({ name: 'taskId', description: 'ID задачи' })
    @ApiBody({ type: UpdateTaskDto })
    async update(
        @Param('columnId') columnId: number,
        @Param('taskId') taskId: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @Req() req
    ): Promise<Task> {
        return this.tasksService.updateTask(
            columnId,
            taskId,
            updateTaskDto,
            req.user
        );
    }

    @Delete(':columnId/:taskId')
    @ApiOperation({ summary: 'Удалить задачу' })
    @ApiResponse({ status: 200, description: 'Задача удалена' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Задача не найдена' })
    @ApiParam({ name: 'columnId', description: 'ID колонки' })
    @ApiParam({ name: 'taskId', description: 'ID задачи' })
    async remove(
        @Param('columnId') columnId: number,
        @Param('taskId') taskId: number,
        @Req() req
    ): Promise<void> {
        return this.tasksService.deleteTask(columnId, taskId, req.user);
    }
}
