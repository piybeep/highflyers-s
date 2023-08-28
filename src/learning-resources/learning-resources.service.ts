import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLearningResourceDto } from './dto/update-learning-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LearningResource } from './entities/learning-resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LearningResourcesService {
    constructor(
        @InjectRepository(LearningResource)
        private readonly learningResourceRepository: Repository<LearningResource>,
    ) {}

    // create(createLearningResourceDto: CreateLearningResourceDto) {
    //     const new_resource = this.learningResourceRepository.create(
    //         createLearningResourceDto,
    //     );
    //     return this.learningResourceRepository.save(new_resource);
    // }

    // createMany(createLearningResourceDto: CreateLearningResourceDto[]) {
    //     const new_resources = this.learningResourceRepository.create(
    //         createLearningResourceDto,
    //     );
    //     return this.learningResourceRepository.save(new_resources);
    // }

    findAll() {
        return this.learningResourceRepository.findAndCount();
    }

    findOne(id: string) {
        return this.learningResourceRepository.findOneBy({ id });
    }

    async update(
        id: string,
        updateLearningResourceDto: UpdateLearningResourceDto,
    ) {
        const existing_resource = await this.findOne(id);
        if (!existing_resource) {
            throw new NotFoundException('Ресурс не найден');
        }
        await this.learningResourceRepository.update(
            id,
            updateLearningResourceDto,
        );
        return this.findOne(id);
    }

    async remove(id: string) {
        const existing_resource = await this.findOne(id);
        if (!existing_resource) {
            throw new NotFoundException('Ресурс не найден');
        }
        return this.learningResourceRepository.delete(id);
    }
}
