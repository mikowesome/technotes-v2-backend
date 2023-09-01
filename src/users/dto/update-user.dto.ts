import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { $Enums } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    username?: string;
    userType?: $Enums.UserType;
    password?: string;
    isActive?: boolean;
}
