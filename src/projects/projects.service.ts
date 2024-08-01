import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-projects.dto';
import { User } from 'src/users/entities/users.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

    async createProject(
        createProjectDto: CreateProjectDto,
        user: User
    ): Promise<Project> {
        const project = this.projectsRepository.create({
            ...createProjectDto,
            user,
            createdAt: new Date(),
        });
        await this.projectsRepository.save(project);
        return this.excludePassword(project);
    }

    async getProjects(user: User): Promise<Project[]> {
        const projects = await this.projectsRepository.find({
            where: { user },
            relations: ['columns', 'columns.tasks'],
        });
        return projects.map(this.excludePassword);
    }

    async getProjectById(id: number, user: User): Promise<Project> {
        const project = await this.projectsRepository.findOne({
            where: { id },
            relations: ['user', 'columns', 'columns.tasks'],
        });
        if (!project || project.user.id !== user.id) {
            throw new UnauthorizedException();
        }
        return this.excludePassword(project);
    }

    async updateProject(
        id: number,
        updateProjectDto: UpdateProjectDto,
        user: User
    ): Promise<Project> {
        const project = await this.getProjectById(id, user);
        if (!project) {
            throw new NotFoundException();
        }
        Object.assign(project, updateProjectDto);
        await this.projectsRepository.save(project);
        return this.excludePassword(project);
    }

    async deleteProject(id: number, user: User): Promise<void> {
        const project = await this.getProjectById(id, user);
        if (!project) {
            throw new NotFoundException();
        }
        await this.projectsRepository.remove(project);
    }

    private excludePassword(project: Project): Project {
        if (project.user) {
            delete project.user.password;
        }
        return project;
    }
}
