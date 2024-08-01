import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { Columns } from 'src/columns/entities/columns.entity';
import { User } from 'src/users/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [ProjectsService],
    controllers: [ProjectsController],
    imports: [TypeOrmModule.forFeature([Project, Columns, User]), AuthModule],
})
export class ProjectsModule {}
