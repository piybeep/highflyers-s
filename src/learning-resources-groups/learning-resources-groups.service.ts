import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningResourcesGroupsService {
    create(/*createLearningResourcesGroupDto: CreateLearningResourcesGroupDto*/) {
        return 'This action adds a new learningResourcesGroup';
    }

    findAll() {
        return `This action returns all learningResourcesGroups`;
    }

    findOne(id: number) {
        return `This action returns a #${id} learningResourcesGroup`;
    }

    update(
        id: number,
        /*updateLearningResourcesGroupDto: UpdateLearningResourcesGroupDto,*/
    ) {
        return `This action updates a #${id} learningResourcesGroup`;
    }

    remove(id: number) {
        return `This action removes a #${id} learningResourcesGroup`;
    }
}
