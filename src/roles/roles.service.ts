import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {}

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = this.roleRepository.create(dto);
        return await this.roleRepository.save(role);
    }

    async getRoleByValue(value: string): Promise<Role> {
        return this.roleRepository.findOne({ where: { value } });
    }
}
