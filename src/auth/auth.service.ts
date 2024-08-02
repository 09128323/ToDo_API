import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        try {
            const user = await this.validateUser(userDto);
            return this.generateToken(user);
        } catch (error) {
            throw new HttpException(
                'Ошибка входа в систему',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    async registration(userDto: CreateUserDto) {
        try {
            const candidate = await this.userService.getUserByEmail(
                userDto.email
            );

            if (candidate) {
                throw new HttpException(
                    'Пользователь с таким email существует',
                    HttpStatus.BAD_REQUEST
                );
            }

            const hashPassword = await bcrypt.hash(userDto.password, 5);
            const user = await this.userService.createUser({
                ...userDto,
                password: hashPassword,
            });

            return this.generateToken(user);
        } catch (error) {
            throw new HttpException(
                'Ошибка регистрации',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private async generateToken(user: User) {
        try {
            const payload = {
                email: user.email,
                id: user.id,
                roles: user.roles,
            };
            return {
                token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new HttpException(
                'Ошибка генерации токена',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        try {
            const user = await this.userService.getUserByEmail(userDto.email);

            if (!user) {
                throw new UnauthorizedException(
                    'Некорректный email или пароль'
                );
            }

            const passwordEquals = await bcrypt.compare(
                userDto.password,
                user.password
            );
            if (passwordEquals) {
                return user;
            } else {
                throw new UnauthorizedException(
                    'Некорректный email или пароль'
                );
            }
        } catch (error) {
            throw new HttpException(
                'Ошибка проверки пользователя',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
