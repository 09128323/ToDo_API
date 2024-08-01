import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/users.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import { Project } from './entities/projects.entity';

@ApiTags('Проекты')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый проект' })
    @ApiResponse({ status: 201, description: 'Проект создан', type: Project })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateProjectDto })
    createProject(
        @Body() createProjectDto: CreateProjectDto,
        @GetUser() user: User
    ) {
        return this.projectsService.createProject(createProjectDto, user);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список проектов' })
    @ApiResponse({
        status: 200,
        description: 'Список проектов',
        type: [Project],
    })
    @ApiResponse({ status: 401, description: 'Не авторизован' })
    getProjects(@GetUser() user: User) {
        return this.projectsService.getProjects(user);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить проект по ID' })
    @ApiResponse({ status: 200, description: 'Проект найден', type: Project })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @ApiParam({ name: 'id', description: 'ID проекта' })
    getProjectById(@Param('id') id: number, @GetUser() user: User) {
        return this.projectsService.getProjectById(id, user);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить проект' })
    @ApiResponse({ status: 200, description: 'Проект обновлен', type: Project })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @ApiParam({ name: 'id', description: 'ID проекта' })
    @ApiBody({ type: UpdateProjectDto })
    updateProject(
        @Param('id') id: number,
        @Body() updateProjectDto: UpdateProjectDto,
        @GetUser() user: User
    ) {
        return this.projectsService.updateProject(id, updateProjectDto, user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить проект' })
    @ApiResponse({ status: 204, description: 'Проект удален' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @ApiParam({ name: 'id', description: 'ID проекта' })
    deleteProject(@Param('id') id: number, @GetUser() user: User) {
        return this.projectsService.deleteProject(id, user);
    }
}
