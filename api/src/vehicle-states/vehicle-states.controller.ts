import {Controller, Get, Param, Query, ValidationPipe} from '@nestjs/common';
import {VehicleStatesService} from './vehicle-states.service';
import {VehicleStateRequestDto} from "./dto/vehicle-state-request.dto";
import {VehicleStateDto} from "./dto/vehicle-state.dto";

@Controller('vehicle-states')
export class VehicleStatesController {
    constructor(
        private readonly vehicleStatesService: VehicleStatesService) {
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query(new ValidationPipe({transform: true})) vehicleStateDto: VehicleStateRequestDto): Promise<VehicleStateDto> {
        return this.vehicleStatesService.findByVehicleIdAndTimestamp(+id, vehicleStateDto.timestamp);
    }
}
