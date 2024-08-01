import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
    @IsString({ message: 'email должен быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: 'user12345', description: 'Пароль' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @Length(4, 25, {
        message: 'Пароль должен быть не меньше 4 и не больше 25 символов',
    })
    readonly password: string;
}
