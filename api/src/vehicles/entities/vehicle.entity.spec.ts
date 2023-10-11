import { Vehicle } from './vehicle.entity';
import { StateLog } from '../../state-logs/entities/state-logs.entity';

describe('Vehicle Entity', () => {
	let vehicle: Vehicle;

	beforeEach(() => {
		vehicle = new Vehicle();
	});

	it('should be defined', () => {
		expect(vehicle).toBeDefined();
	});

	it('should set id, make, model, and state correctly', () => {
		vehicle.id = 1;
		vehicle.make = 'Toyota';
		vehicle.model = 'Camry';
		vehicle.state = 'selling';

		expect(vehicle.id).toBe(1);
		expect(vehicle.make).toBe('Toyota');
		expect(vehicle.model).toBe('Camry');
		expect(vehicle.state).toBe('selling');
	});

	it('should have a one-to-many relationship with StateLog', () => {
		const stateLog = new StateLog();
		vehicle.stateLogs = [stateLog];

		expect(vehicle.stateLogs).toEqual([stateLog]);
	});
});
