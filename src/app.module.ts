import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UnicornsController } from './unicorns/unicorns.controller';
import { UnicornsService } from './unicorns/unicorns.service';
import { CapacitiesController } from './capacities/capacities.controller';
import { CapacitiesService } from './capacities/capacities.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'assets'),
        }),
    ],
    controllers: [UnicornsController, CapacitiesController],
    providers: [UnicornsService, CapacitiesService],
})
export class AppModule {}
