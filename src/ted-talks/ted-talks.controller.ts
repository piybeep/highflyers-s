import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateTedTalkDto } from './dto/create-ted-talk.dto';
import { UpdateTedTalkDto } from './dto/update-ted-talk.dto';
import { TedTalksService } from './ted-talks.service';

@Controller('ted-talks')
export class TedTalksController {
    constructor(private readonly tedTalksService: TedTalksService) {}

    @Post()
    create(@Body() createTedTalkDto: CreateTedTalkDto) {
        return this.tedTalksService.create(createTedTalkDto);
    }

    @Get()
    findAll() {
        return this.tedTalksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tedTalksService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTedTalkDto: UpdateTedTalkDto,
    ) {
        return this.tedTalksService.update(id, updateTedTalkDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tedTalksService.remove(id);
    }
}
