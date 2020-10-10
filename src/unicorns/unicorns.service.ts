import { Injectable } from '@nestjs/common';
import { Unicorn } from './interfaces/unicorn.interface';
import { CreateUnicornDto } from './dto/create-unicorn.dto';
import { UpdateUnicornDto } from './dto/update-unicorn.dto';
import unicorns from './unicorns.data';

@Injectable()
export class UnicornsService {
    private unicorns: Unicorn[] = unicorns;

    create(unicorn: CreateUnicornDto): Unicorn {
        const unicornWithId = {
            ...unicorn,
            id: this.unicorns.reduce((acc, val) => (val.id > acc ? val.id : acc), 1) + 1,
        };
        this.unicorns = this.unicorns.concat(unicornWithId);
        return unicornWithId;
    }

    findAll(): Unicorn[] {
        return this.unicorns;
    }

    findOne(id: number): Unicorn {
        return this.unicorns.find(u => u.id === id);
    }

    exists(id: number): boolean {
        return this.unicorns.some(u => u.id === id);
    }

    update(unicorn: UpdateUnicornDto): Unicorn {
        this.unicorns = this.unicorns.filter(u => u.id !== unicorn.id).concat(unicorn);
        return unicorn;
    }

    delete(id: number): void {
        this.unicorns = this.unicorns.filter(u => u.id !== id);
    }
}
