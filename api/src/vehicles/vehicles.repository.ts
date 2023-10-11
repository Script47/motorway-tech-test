import {Vehicle} from './entities/vehicle.entity';
import {DataSource, Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';

@Injectable()
export class VehiclesRepository extends Repository<Vehicle> {
    constructor(dataSource: DataSource) {
        super(Vehicle, dataSource.createEntityManager());
    }

    async findByIdAndTimestamp(id: number, timestamp: string) {
        return await this.createQueryBuilder('v')
            .leftJoinAndSelect('v.stateLogs', 'sl')
            .where('v.id = :vid')
            .andWhere('sl.timestamp <= :ts')
            .orderBy('sl.timestamp', 'DESC')
            .limit(1)
            .setParameters({
                vid: id,
                ts: timestamp
            })
            .getOne();
    }
}
