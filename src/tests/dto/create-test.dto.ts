import { ApiProperty } from '@nestjs/swagger';
import { TestTypes } from '@src/tests/entities/test.entity';
import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(TestTypes)
    type: TestTypes;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    tests: string[];
}
