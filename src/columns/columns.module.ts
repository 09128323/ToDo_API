import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './entities/columns.entity';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Project } from 'src/projects/entities/projects.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Columns, Task, Project]), AuthModule],
    providers: [ColumnsService],
    controllers: [ColumnsController],
    exports: [ColumnsService],
})
export class ColumnsModule {}
