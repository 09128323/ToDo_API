import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {}

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = this.roleRepository.create(createRoleDto);

        try {
            await this.roleRepository.save(role);
            return role;
        } catch (error) {
            throw new InternalServerErrorException('Ошибка при создании роли');
        }
    }

    async getRoles(): Promise<Role[]> {
        try {
            return await this.roleRepository.find();
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при получении ролей'
            );
        }
    }

    async getRoleById(roleId: number): Promise<Role> {
        const role = await this.roleRepository.findOne({
            where: { id: roleId },
        });

        if (!role) {
            throw new NotFoundException('Роль не найдена');
        }

        return role;
    }

    async getRoleByValue(value: string): Promise<Role> {
        return this.roleRepository.findOne({ where: { value } });
    }

    async updateRole(
        roleId: number,
        updateRoleDto: UpdateRoleDto
    ): Promise<Role> {
        const role = await this.getRoleById(roleId);

        Object.assign(role, updateRoleDto);

        try {
            await this.roleRepository.save(role);
            return role;
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при обновлении роли'
            );
        }
    }

    async deleteRole(roleId: number): Promise<void> {
        const role = await this.getRoleById(roleId);

        try {
            await this.roleRepository.remove(role);
        } catch (error) {
            throw new InternalServerErrorException('Ошибка при удалении роли');
        }
    }
}
