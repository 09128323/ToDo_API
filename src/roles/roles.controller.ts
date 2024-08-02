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
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './entities/roles.entity';

@ApiTags('Роли')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую роль' })
    @ApiResponse({ status: 201, description: 'Роль создана', type: Role })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 500, description: 'Ошибка сервера' })
    @ApiBody({ type: CreateRoleDto })
    async create(
        @Body() createRoleDto: CreateRoleDto,
        @Req() req
    ): Promise<Role> {
        return this.rolesService.createRole(createRoleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все роли' })
    @ApiResponse({ status: 200, description: 'Список ролей', type: [Role] })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 500, description: 'Ошибка сервера' })
    async findAll(@Req() req): Promise<Role[]> {
        return this.rolesService.getRoles();
    }

    @Get(':roleId')
    @ApiOperation({ summary: 'Получить роль по ID' })
    @ApiResponse({
        status: 200,
        description: 'Информация о роли',
        type: Role,
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Роль не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка сервера' })
    @ApiParam({ name: 'roleId', description: 'ID роли' })
    async findOne(@Param('roleId') roleId: number, @Req() req): Promise<Role> {
        return this.rolesService.getRoleById(roleId);
    }

    @Put(':roleId')
    @ApiOperation({ summary: 'Обновить роль' })
    @ApiResponse({ status: 200, description: 'Роль обновлена', type: Role })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Роль не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка сервера' })
    @ApiParam({ name: 'roleId', description: 'ID роли' })
    @ApiBody({ type: UpdateRoleDto })
    async update(
        @Param('roleId') roleId: number,
        @Body() updateRoleDto: UpdateRoleDto,
        @Req() req
    ): Promise<Role> {
        return this.rolesService.updateRole(roleId, updateRoleDto);
    }

    @Delete(':roleId')
    @ApiOperation({ summary: 'Удалить роль' })
    @ApiResponse({ status: 200, description: 'Роль удалена' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Роль не найдена' })
    @ApiResponse({ status: 500, description: 'Ошибка сервера' })
    @ApiParam({ name: 'roleId', description: 'ID роли' })
    async remove(@Param('roleId') roleId: number, @Req() req): Promise<void> {
        return this.rolesService.deleteRole(roleId);
    }
}
