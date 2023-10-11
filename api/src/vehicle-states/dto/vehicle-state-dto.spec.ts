import { VehicleStateDto } from './vehicle-state.dto';

describe('VehicleStateDto', () => {
    it('should be defined', () => {
        const dto = new VehicleStateDto();
        expect(dto).toBeDefined();
    });

    it('should set vehicleId, state, and timestamp correctly', () => {
        const dto = new VehicleStateDto();
        dto.vehicleId = 1;
        dto.state = 'selling';
        dto.timestamp = '2022-09-12 10:00:00+00';

        expect(dto.vehicleId).toBe(1);
        expect(dto.state).toBe('selling');
        expect(dto.timestamp).toBe('2022-09-12 10:00:00+00');
    });
});
