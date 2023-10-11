import { StateLog } from './state-logs.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

describe('StateLog Entity', () => {
    let stateLog: StateLog;

    beforeEach(() => {
        stateLog = new StateLog();
    });

    it('should be defined', () => {
        expect(stateLog).toBeDefined();
    });

    it('should set id, vehicleId, state, and timestamp correctly', () => {
        stateLog.id = 1;
        stateLog.vehicleId = 1;
        stateLog.state = 'running';
        stateLog.timestamp = new Date('2023-10-12T12:00:00Z');

        expect(stateLog.id).toBe(1);
        expect(stateLog.vehicleId).toBe(1);
        expect(stateLog.state).toBe('running');
        expect(stateLog.timestamp).toEqual(new Date('2023-10-12T12:00:00Z'));
    });

    it('should have a many-to-one relationship with Vehicle', () => {
        const vehicle = new Vehicle();
        stateLog.vehicle = vehicle;

        expect(stateLog.vehicle).toBe(vehicle);
    });
});
