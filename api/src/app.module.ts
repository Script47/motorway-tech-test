import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Vehicle} from './vehicles/entities/vehicle.entity';
import {StateLog} from "./state-logs/entities/state-logs.entity";
import {RedisService} from './redis/redis.service';
import {VehicleStatesModule} from './vehicle-states/vehicle-states.module';
import {VehiclesModule} from "./vehicles/vehicles.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USER,
            entities: [Vehicle, StateLog],
            database: process.env.DB_NAME,
            synchronize: true,
            logging: false,
        }),
        VehicleStatesModule,
        VehiclesModule
    ],
    controllers: [AppController],
    providers: [AppService, RedisService],
})
export class AppModule {
}
