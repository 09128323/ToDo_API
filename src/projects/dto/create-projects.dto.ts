import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({
        example: 'Project 1',
        description: 'Название нового проекта',
    })
    @IsString({ message: 'name должно быть строкой' })
    @Length(1, 255, { message: 'name должно быть от 1 до 255 символов' })
    name: string;

    @ApiProperty({
        example: 'This is a description of Project 1.',
        description: 'Описание нового проекта',
    })
    @IsString({ message: 'description должно быть строкой' })
    @Length(0, 255, { message: 'description должно быть до 255 символов' })
    description: string;
}
