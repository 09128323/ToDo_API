import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Task 1', description: 'Название задачи' })
    @IsString({ message: 'title должно быть строкой' })
    @Length(1, 255, { message: 'title должно быть от 1 до 255 символов' })
    title: string;

    @ApiProperty({
        example: 'Task description',
        description: 'Описание задачи',
    })
    @IsString({ message: 'description должно быть строкой' })
    @Length(0, 255, { message: 'description должно быть до 255 символов' })
    description: string;

    @ApiProperty({ example: 1, description: 'Позиция задачи в колонке' })
    @IsInt({ message: 'position должно быть целым числом' })
    @Min(0, { message: 'position должно быть не меньше 0' })
    position: number;
}
