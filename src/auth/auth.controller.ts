import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Войти в систему' })
    @ApiResponse({ status: 200, description: 'Успешный вход' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateUserDto })
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь зарегистрирован' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateUserDto })
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
