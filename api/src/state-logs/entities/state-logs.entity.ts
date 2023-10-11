import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Vehicle} from '../../vehicles/entities/vehicle.entity';

@Entity('stateLogs')
export class StateLog {
    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'integer'})
    vehicleId: number;

    @Column({type: 'text', nullable: false})
    state: string;

    @Column({type: 'timestamp with time zone', nullable: false})
    timestamp: Date;

    @ManyToOne(() => Vehicle, vehicle => vehicle.stateLogs)
    @JoinColumn({name: 'vehicleId'})
    vehicle: Vehicle;
}
