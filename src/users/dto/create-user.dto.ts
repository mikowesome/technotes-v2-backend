import { UserType } from "@prisma/client";
import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserType)
    @IsOptional()
    userType?: UserType;
}