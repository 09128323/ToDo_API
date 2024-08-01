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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Columns } from './entities/columns.entity';

@ApiTags('Столбцы')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @Post(':projectId')
    @ApiOperation({ summary: 'Создать новую колонку' })
    @ApiResponse({ status: 201, description: 'Колонка создана', type: Columns })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiParam({ name: 'projectId', description: 'ID проекта' })
    @ApiBody({ type: CreateColumnDto })
    async create(
        @Param('projectId') projectId: number,
        @Body() createColumnDto: CreateColumnDto,
        @Req() req
    ): Promise<Columns> {
        return this.columnsService.createColumn(
            createColumnDto,
            projectId,
            req.user
        );
    }

    @Get(':projectId')
    @ApiOperation({ summary: 'Получить все колонки проекта' })
    @ApiResponse({
        status: 200,
        description: 'Список колонок',
        type: [Columns],
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiParam({ name: 'projectId', description: 'ID проекта' })
    async findAll(
        @Param('projectId') projectId: number,
        @Req() req
    ): Promise<Columns[]> {
        return this.columnsService.getColumns(projectId, req.user);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить колонку по ID' })
    @ApiResponse({
        status: 200,
        description: 'Информация о колонке',
        type: Columns,
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiParam({ name: 'id', description: 'ID колонки' })
    async findOne(@Param('id') id: number, @Req() req): Promise<Columns> {
        return this.columnsService.getColumnById(id, req.user);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить колонку' })
    @ApiResponse({
        status: 200,
        description: 'Колонка обновлена',
        type: Columns,
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiParam({ name: 'id', description: 'ID колонки' })
    @ApiBody({ type: UpdateColumnDto })
    async update(
        @Param('id') id: number,
        @Body() updateColumnDto: UpdateColumnDto,
        @Req() req
    ): Promise<Columns> {
        return this.columnsService.updateColumn(id, updateColumnDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить колонку' })
    @ApiResponse({ status: 200, description: 'Колонка удалена' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiParam({ name: 'id', description: 'ID колонки' })
    async remove(@Param('id') id: number, @Req() req): Promise<void> {
        return this.columnsService.deleteColumn(id, req.user);
    }
}
