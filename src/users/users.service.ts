import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewUser({ username, password, userType }: CreateUserDto): Promise<{ message: string }> {
        // Check for duplicate
        const duplicate = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if (duplicate) {
            throw new ConflictException('Duplicate username');
        }

        const hashedPassword = await this.hashData(password);

        // Create and store new user
        const user = await this.prismaService.user.create({
            data: {
                username,
                password: hashedPassword,
                userType
            }
        })

        if (user) {
            return { message: `New user ${username} created` }
        } else {
            throw new HttpException('Invalid user data received', 400)
        }
  }

  async getAllUsers(): Promise<User[]> {
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                username: true,
                userType: true,
                isActive: true
            }
        })
    
        if (!users?.length) {
          throw new NotFoundException('No users found')
        }
    
        return users
  }

  async getUser(id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new HttpException('User not found', 400)
        }

        return user
  }

  async updateUser(id: string, { username, password, userType, isActive }: UpdateUserDto): Promise<{ message: string }> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new HttpException('User not found', 400)
        }

        const duplicate = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if (duplicate && duplicate?.id !== id) {
            throw new HttpException('Duplicate username', 409);
        }

        const data = password ?
        {
            username,
            password: await this.hashData(password),
            userType,
            isActive
        } : 
        {
            username,
            userType,
            isActive
        }

        const updatedUser = await this.prismaService.user.update({
            where: {
                id
            },
            data
        })

        return { message: `${updatedUser.username} updated` }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
        const notes = await this.prismaService.note.findMany({
            where: {
                userId: id
            }
        })
    
        if (notes?.length) {
            throw new HttpException('User has assigned notes', 400);
        }
    
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })
    
        if (!user) {
            throw new HttpException('User not found', 400);
        }
    
        const result = await this.prismaService.user.delete({
            where: {
                id
            }
        })
    
        return { message: `Username ${result.username} with ID ${result.id} deleted` }
  }

  private async hashData(data: string) {
    try {
        return bcrypt.hash(data, 10);
    } catch (error) {
        throw new InternalServerErrorException('Error while hashing data')
    }
  }
}
