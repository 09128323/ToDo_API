import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import { Role } from './entities/roles.entity';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую роль' })
    @ApiResponse({ status: 201, description: 'Роль создана', type: Role })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateRoleDto })
    createRole(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(dto);
    }

    @Get('/:value')
    @ApiOperation({ summary: 'Получить роль по значению' })
    @ApiResponse({ status: 200, description: 'Роль найдена', type: Role })
    @ApiResponse({ status: 404, description: 'Роль не найдена' })
    @ApiParam({ name: 'value', description: 'Значение роли' })
    getRoleByValue(@Param('value') value: string): Promise<Role> {
        return this.rolesService.getRoleByValue(value);
    }
}
