import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsInt, Min } from 'class-validator';

export class UpdateColumnDto {
    @ApiProperty({ example: 'In Progress', description: 'Название колонки' })
    @IsOptional()
    @IsString({ message: 'name должно быть строкой' })
    @Length(1, 50, { message: 'name должно быть от 1 до 50 символов' })
    name?: string;

    @ApiProperty({ example: 2, description: 'Позиция колонки в проекте' })
    @IsOptional()
    @IsInt({ message: 'position должно быть целым числом' })
    @Min(0, { message: 'position должно быть больше или равно 0' })
    position?: number;
}
