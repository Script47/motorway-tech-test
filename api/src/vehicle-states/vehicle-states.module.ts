import {Module} from '@nestjs/common';
import {VehicleStatesService} from './vehicle-states.service';
import {VehicleStatesController} from './vehicle-states.controller';
import {VehiclesRepository} from "../vehicles/vehicles.repository";
import {RedisService} from "../redis/redis.service";

@Module({
    controllers: [VehicleStatesController],
    providers: [VehicleStatesService, VehiclesRepository, RedisService],
})
export class VehicleStatesModule {
}
