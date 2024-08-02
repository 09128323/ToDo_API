import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Logger } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const logger = new Logger('TypeOrmModule');
                const type = 'postgres';
                const host = configService.get<string>('DB_HOST');
                const port = Number(configService.get<string>('DB_PORT'));
                const username = configService.get<string>('DB_USERNAME');
                const password = configService.get<string>('DB_PASSWORD');
                const database = configService.get<string>('DB_NAME');

                if (!host || !port || !username || !password || !database) {
                    logger.error('Database configuration is invalid');
                    throw new Error('Invalid database configuration');
                }

                return {
                    type,
                    host,
                    port,
                    username,
                    password,
                    database,
                    synchronize: true,
                    entities: [__dirname + '/**/*.entity{.js, .ts}'],
                };
            },
            inject: [ConfigService],
        }),
        UsersModule,
        ProjectsModule,
        ColumnsModule,
        TasksModule,
        RolesModule,
        AuthModule,
    ],
})
export class AppModule {}
