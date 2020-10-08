import { Injectable } from '@nestjs/common';
import capacities from './capacities.data';
import { Capacity } from './interfaces/capacity.interface';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';

@Injectable()
export class CapacitiesService {
    private capacities: Capacity[] = capacities;

    create(capacity: CreateCapacityDto): Capacity {
        const capacityWithId = {
            ...capacity,
            id: this.capacities.reduce((acc, val) => (val.id > acc ? val.id : acc), 1) + 1,
        };
        this.capacities = this.capacities.concat(capacityWithId);
        return capacityWithId;
    }

    findAll(): Capacity[] {
        return this.capacities;
    }

    findOne(id: number): Capacity {
        return this.capacities.find(c => c.id === id);
    }

    exists(id: number): boolean {
        return this.capacities.some(c => c.id === id);
    }

    update(capacity: UpdateCapacityDto): Capacity {
        this.capacities = this.capacities.filter(c => c.id !== capacity.id).concat(capacity);
        return capacity;
    }

    delete(id: number): void {
        this.capacities = this.capacities.filter(c => c.id !== id);
    }
}
