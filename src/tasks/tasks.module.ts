import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from 'src/columns/entities/columns.entity';
import { Project } from 'src/projects/entities/projects.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Columns, Project]), AuthModule],
    providers: [TasksService],
    controllers: [TasksController],
    exports: [TasksService],
})
export class TasksModule {}
