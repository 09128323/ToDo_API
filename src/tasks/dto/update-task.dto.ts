import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsInt, Min } from 'class-validator';

export class UpdateTaskDto {
    @ApiProperty({
        example: 'Updated Task Title',
        description: 'Название задачи',
    })
    @IsOptional()
    @IsString({ message: 'title должно быть строкой' })
    @Length(1, 255, { message: 'title должно быть от 1 до 255 символов' })
    title?: string;

    @ApiProperty({
        example: 'Updated Task Description',
        description: 'Описание задачи',
    })
    @IsOptional()
    @IsString({ message: 'description должно быть строкой' })
    @Length(0, 255, { message: 'description должно быть до 255 символов' })
    description?: string;

    @ApiProperty({ example: 2, description: 'Позиция задачи в колонке' })
    @IsOptional()
    @IsInt({ message: 'position должно быть целым числом' })
    @Min(0, { message: 'position должно быть не меньше 0' })
    position?: number;
}
