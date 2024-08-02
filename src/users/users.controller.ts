import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Query,
    Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Создать пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    async create(@Body() userDto: CreateUserDto) {
        try {
            return await this.usersService.createUser(userDto);
        } catch (error) {
            this.logger.error('Ошибка при создании пользователя', error);
            throw error;
        }
    }

    @ApiOperation({ summary: 'Получить пользователя по email' })
    @ApiResponse({ status: 200, type: User })
    @Get()
    async getUserByEmail(@Query('email') email: string) {
        try {
            return await this.usersService.getUserByEmail(email);
        } catch (error) {
            this.logger.error(
                'Ошибка при получении пользователя по email',
                error
            );
            throw error;
        }
    }

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get('/allUsers')
    async getAllUsers() {
        try {
            return await this.usersService.getAllUsers();
        } catch (error) {
            this.logger.error('Ошибка при получении всех пользователей', error);
            throw error;
        }
    }

    @ApiOperation({ summary: 'Добавить роль пользователю' })
    @ApiResponse({ status: 200, type: Role })
    @Post('/role')
    async addRole(@Body() dto: AddRoleDto) {
        try {
            return await this.usersService.addRole(dto);
        } catch (error) {
            this.logger.error('Ошибка при добавлении роли пользователю', error);
            throw error;
        }
    }
}
