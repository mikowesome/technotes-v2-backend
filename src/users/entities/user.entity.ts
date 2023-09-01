import { UserType } from "@prisma/client";

export class User {
    id: string;
    username: string;
    password?: string;
    userType: UserType;
    isActive: boolean;
}