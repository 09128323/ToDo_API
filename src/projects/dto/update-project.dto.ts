import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProjectDto {
    @ApiPropertyOptional({
        example: 'Project Beta',
        description: 'Новое название проекта',
    })
    @IsOptional()
    @IsString({ message: 'name должно быть строкой' })
    @Length(1, 255, { message: 'name должно быть от 1 до 255 символов' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'description должно быть строкой' })
    @Length(0, 255, { message: 'description должно быть до 255 символов' })
    @ApiPropertyOptional({
        example: 'Updated description of Project Beta.',
        description: 'Новое описание проекта',
    })
    description?: string;
}
