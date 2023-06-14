import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { GetAllDto } from './dto/get-all.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    delete dto.isAdmin;
    const new_user = this.userRepository.create(dto);
    await this.userRepository.save(new_user);
    return new_user;
  }

  async getAll(dto: GetAllDto) {
    const takeCount = 12;
    const [users, count] = await this.userRepository.findAndCount({
      skip: parseInt(dto.page ?? '1') * takeCount,
      take: takeCount,
    });
    return { users, count };
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, dto: UpdateUserDto) {
    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    delete dto.isAdmin;
    await this.userRepository.update(id, dto);
    user = await this.findById(id);
    return user;
  }

  async remove(id: string) {
    const candidate = this.findById(id);
    if (!candidate) {
      throw new NotFoundException('Пользователь не найден');
    }
    await this.userRepository.delete({ id });
    return candidate;
  }

  async makeAdmin(id: string, reverse = false) {
    const candidate = this.findById(id);
    if (!candidate) {
      throw new NotFoundException('Пользователь не найден');
    }
    await this.userRepository.update(id, { isAdmin: !reverse });
    return this.findById(id);
  }
}
