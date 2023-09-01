import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @desc Create new user
  // @route POST /users
  // @access Private
  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.usersService.createNewUser(createUserDto);
  }

  // @desc Get all users
  // @route GET /users
  // @access Private
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // @desc Get user
  // @route GET /users/:id
  // @access Private
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  // @desc Update a user
  // @route PATCH /users/:id
  // @access Private
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // @desc Delete a user
  // @route DELETE /users/:id
  // @access Private
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.deleteUser(id);
  }
}