import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class CreateColumnDto {
    @ApiProperty({ example: 'To Do', description: 'Название колонки' })
    @IsString({ message: 'name должно быть строкой' })
    @Length(1, 50, { message: 'name должно быть от 1 до 50 символов' })
    name: string;

    @ApiProperty({ example: 1, description: 'Позиция колонки в проекте' })
    @IsInt({ message: 'position должно быть целым числом' })
    @Min(0, { message: 'position должно быть больше или равно 0' })
    position: number;
}
