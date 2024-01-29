import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UnicornsController } from './resources/unicorns/unicorns.controller';
import { UnicornsService } from './resources/unicorns/unicorns.service';
import { CapacitiesController } from './resources/capacities/capacities.controller';
import { CapacitiesService } from './resources/capacities/capacities.service';
import { DelayMiddleware } from './middlewares/delay.middleware';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'assets'),
        }),
    ],
    controllers: [UnicornsController, CapacitiesController],
    providers: [UnicornsService, CapacitiesService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DelayMiddleware).forRoutes('unicorns', 'capacities');
    }
}
