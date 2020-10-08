import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { UnicornsService } from './unicorns.service';
import { CreateUnicornDto } from './dto/create-unicorn.dto';
import { Unicorn } from './interfaces/unicorn.interface';
import { UpdateUnicornDto } from './dto/update-unicorn.dto';

@Controller('unicorns')
export class UnicornsController {
    constructor(private readonly unicornsService: UnicornsService) {}

    @Post()
    create(@Body() unicorn: CreateUnicornDto) {
        return this.unicornsService.create(unicorn);
    }

    @Get()
    findAll(): Unicorn[] {
        return this.unicornsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number) {
        const unicorn = this.unicornsService.findOne(id);
        if (!unicorn) {
            throw new NotFoundException(`Unicorn '${id}' not found`);
        }
        return unicorn;
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() unicorn: UpdateUnicornDto) {
        if (id !== unicorn.id) {
            throw new BadRequestException('Incoherent unicorn ID between request param and payload');
        }
        if (!this.unicornsService.exists(id)) {
            throw new NotFoundException(`Unicorn '${id}' not found`);
        }
        return this.unicornsService.update(unicorn);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', new ParseIntPipe()) id: number): void {
        const unicorn = this.unicornsService.findOne(id);
        if (!unicorn) {
            throw new NotFoundException(`Unicorn '${id}' not found`);
        }
        return this.unicornsService.delete(id);
    }
}
