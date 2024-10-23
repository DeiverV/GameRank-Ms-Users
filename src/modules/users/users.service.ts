import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

import { DetailsUser, User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.generateMockData();
  }

  private generateMockData(): void {
    for (let i = 0; i < 1000; i++) {
      this.users.push({
        id: uuidv4(),
        email: faker.internet.email(),
        image: faker.internet.url(),
        isActive: true,
        isBlocked: false,
        name: faker.internet.userName(),
        password: faker.internet.password(),
        role: 'PLAYER',
        username: faker.internet.userName(),
      });
    }
  }

  getAllUsers() {
    const allUsers: DetailsUser[] = this.users
      .filter((user) => user.role === 'PLAYER')
      .map((user) => ({
        email: user.email,
        highestScore: Math.random(),
        id: user.id,
        image: user.image,
        isBlocked: user.isBlocked,
        name: user.name,
        rank: Math.random(),
        role: user.role,
        username: user.username,
      }));

    return allUsers;
  }

  getUserById(id: string): DetailsUser {
    const user = this.users.find((user) => user.id === id);
    const detailsUser = {
      email: user.email,
      highestScore: Math.random(),
      id: user.id,
      image: user.image,
      isBlocked: user.isBlocked,
      name: user.name,
      rank: Math.random(),
      role: user.role,
      username: user.username,
    };

    return detailsUser;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      isActive: true,
      isBlocked: true,
      role: 'PLAYER',
      ...createUserDto,
    };

    this.users.push(newUser);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      username: updateUserDto.username,
      image: updateUserDto.image.name,
    };

    return this.users[userIndex];
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}