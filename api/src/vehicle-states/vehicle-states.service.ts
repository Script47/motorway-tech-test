import {Injectable, NotFoundException} from '@nestjs/common';
import {VehiclesRepository} from "../vehicles/vehicles.repository";
import {RedisService} from "../redis/redis.service";
import * as moment from "moment-timezone";
import {VehicleStateDto} from "./dto/vehicle-state.dto";

@Injectable()
export class VehicleStatesService {
    constructor(
        private readonly redisService: RedisService,
        private readonly vehiclesRepository: VehiclesRepository) {
    }

    async findByVehicleIdAndTimestamp(id: number, timestamp: string): Promise<VehicleStateDto> {
        const redisKey = `${id}_${timestamp}`.replace(/ /g, '');
        const redisVal = await this.redisService.get(redisKey)

        if (redisVal) {
            return {
                vehicleId: redisVal.vehicleId,
                state: redisVal.state,
                timestamp: redisVal.timestamp
            }
        }

        const vehicle = await this.vehiclesRepository.findByIdAndTimestamp(id, timestamp);

        if (!vehicle) {
            throw new NotFoundException('Vehicle not found.');
        }

        const response = {
            vehicleId: vehicle.id,
            state: vehicle.stateLogs[0].state,
            timestamp: moment(vehicle.stateLogs[0].timestamp.toISOString()).format('YYYY-MM-DD HH:mm:ssZ').slice(0, -3)
        };

        // we can debate if this should be called
        // sync or async, for now, let's make it
        // sync
        await this.redisService.set(redisKey, response)

        return response;
    }
}
