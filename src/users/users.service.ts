import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { User } from './entities/users.entity';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private rolesService: RolesService
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create({
                email: dto.email,
                password: dto.password,
            });

            return await this.userRepository.save(user);
        } catch (error) {
            this.logger.error('Ошибка при создании пользователя', error.stack);
            throw new HttpException(
                'Ошибка при создании пользователя',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find({ relations: ['roles'] });
        } catch (error) {
            this.logger.error(
                'Ошибка при получении всех пользователей',
                error.stack
            );
            throw new HttpException(
                'Ошибка при получении всех пользователей',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: dto.userId },
                relations: ['roles'],
            });

            if (!user) {
                throw new HttpException(
                    'Пользователь не найден',
                    HttpStatus.NOT_FOUND
                );
            }

            const role = await this.rolesService.getRoleByValue(dto.value);

            if (!role) {
                throw new HttpException(
                    'Роль не найдена',
                    HttpStatus.NOT_FOUND
                );
            }

            user.roles.push(role);
            await this.userRepository.save(user);

            return dto;
        } catch (error) {
            this.logger.error('Ошибка при добавлении роли пользователю', error);
            throw new HttpException(
                'Ошибка при добавлении роли пользователю',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({
                where: { email },
                relations: ['roles'],
            });
        } catch (error) {
            this.logger.error(
                'Ошибка при получении пользователя по email',
                error
            );
            throw new HttpException(
                'Ошибка при получении пользователя по email',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    async deleteUserByEmail(email: string): Promise<{ message: string }> {
        try {
          const user = await this.userRepository.findOneBy({ email });
          if (!user) {
            throw new NotFoundException(`Пользователь с email ${email} не найден.`);
          }
    
          await this.userRepository.remove(user);
          return { message: `Пользователь с email ${email} успешно удалён.` };
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw error;
          } else {
            throw new InternalServerErrorException('Ошибка при удалении пользователя.');
          }
        }
      }
}
