import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {StateLog} from "../../state-logs/entities/state-logs.entity";

@Entity('vehicles')
export class Vehicle {
    @PrimaryColumn({type: 'int',})
    id: number

    @Column({type: 'text', nullable: false})
    make: string;

    @Column({type: 'text', nullable: false})
    model: string;

    @Column({type: 'text', nullable: false})
    state: string;

    @OneToMany(() => StateLog, stateLog => stateLog.vehicle)
    stateLogs: StateLog[];
}
