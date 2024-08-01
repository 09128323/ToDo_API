import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class AddRoleDto {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    @IsInt({ message: 'userId должно быть целым числом' })
    @Min(1, { message: 'userId должно быть больше 0' })
    readonly userId: number;

    @ApiProperty({ example: 'admin', description: 'Значение роли' })
    @IsString({ message: 'value должно быть строкой' })
    readonly value: string;
}
