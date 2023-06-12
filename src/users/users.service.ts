import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const new_user = this.userRepository.create(dto);
    await this.userRepository.save(new_user);
    return new_user;
  }

  async getAll() {
    const [users, count] = await this.userRepository.findAndCount();
    return { users, count };
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь с таким id не найден');
    }
    await this.userRepository.update(id, dto);
    user = await this.findById(id);
    return user;
  }

  async remove(id: string) {
    const removed_user = await this.userRepository.softRemove({ id });
    return removed_user;
  }
}
