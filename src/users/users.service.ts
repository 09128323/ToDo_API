import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { User } from './entities/users.entity';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private rolesService: RolesService
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            email: dto.email,
            password: dto.password,
        });

        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find({ relations: ['roles'] });
    }

    async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
        // Найти пользователя по ID
        const user = await this.userRepository.findOne({
            where: { id: dto.userId },
            relations: ['roles'],
        });
        // Найти роль по значению
        const role = await this.rolesService.getRoleByValue(dto.value);

        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND
            );
        }

        if (!role) {
            throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
        }

        // Добавить роль пользователю
        user.roles.push(role);
        await this.userRepository.save(user);

        return dto;
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email },
            relations: ['roles'],
        });
    }

    // async updateUser(user: User): Promise<User> {
    //     return this.userRepository.save(user);
    // }
}
