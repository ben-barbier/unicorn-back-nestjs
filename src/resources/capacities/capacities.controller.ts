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
import { CapacitiesService } from './capacities.service';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { Capacity } from './interfaces/capacity.interface';
import { UpdateCapacityDto } from './dto/update-capacity.dto';

@Controller('capacities')
export class CapacitiesController {
    constructor(private readonly capacitiesService: CapacitiesService) {}

    @Post()
    create(@Body() capacity: CreateCapacityDto) {
        return this.capacitiesService.create(capacity);
    }

    @Get()
    async findAll(): Promise<Capacity[]> {
        return this.capacitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number) {
        const capacity = this.capacitiesService.findOne(id);
        if (!capacity) {
            throw new NotFoundException(`Capacity '${id}' not found`);
        }
        return capacity;
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() capacity: UpdateCapacityDto) {
        if (id !== capacity.id) {
            throw new BadRequestException('Incoherent capacity ID between request param and payload');
        }
        if (!this.capacitiesService.exists(id)) {
            throw new NotFoundException(`Capacity '${id}' not found`);
        }
        return this.capacitiesService.update(capacity);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', new ParseIntPipe()) id: number): void {
        const capacity = this.capacitiesService.findOne(id);
        if (!capacity) {
            throw new NotFoundException(`Capacity '${id}' not found`);
        }
        return this.capacitiesService.delete(id);
    }
}
