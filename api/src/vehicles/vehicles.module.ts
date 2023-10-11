import {Module} from '@nestjs/common';
import {Vehicle} from "./entities/vehicle.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {VehiclesRepository} from './vehicles.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle])],
    providers: [VehiclesRepository],
})
export class VehiclesModule {
}
