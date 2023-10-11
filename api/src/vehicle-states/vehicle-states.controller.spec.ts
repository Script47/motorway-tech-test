import {Test, TestingModule} from '@nestjs/testing';
import {VehicleStatesController} from './vehicle-states.controller';
import {VehicleStatesService} from './vehicle-states.service';
import {VehicleStateDto} from "./dto/vehicle-state-dto";

describe('VehiclesStatesController', () => {
    let vehicleStatesController: VehicleStatesController;
    let vehicleStatesService: VehicleStatesService;

    const mockDto: VehicleStateDto = {
        vehicleId: 3,
        state: 'selling',
        timestamp: '2022-09-12 10:00:00+00'
    };

    const mockVehicleStatesService = {
        findByVehicleIdAndTimestamp: jest.fn().mockResolvedValue(mockDto)
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehicleStatesController],
            providers: [
                {
                    provide: VehicleStatesService,
                    useValue: mockVehicleStatesService
                },
            ],
        }).compile();

        vehicleStatesService = module.get<VehicleStatesService>(VehicleStatesService);
        vehicleStatesController = module.get<VehicleStatesController>(VehicleStatesController);
    });

    it('should be defined', () => {
        expect(vehicleStatesController).toBeDefined();
    });

    describe('findOne', () => {
        it('should return a vehicle state using ID and timestamp', async () => {
            const result: VehicleStateDto = await vehicleStatesController.findOne('3', {
                timestamp: '2022-09-12 10:00:00+00'
            });

            expect(vehicleStatesService.findByVehicleIdAndTimestamp).toHaveBeenCalled();
            expect(result).toEqual(mockDto);
        });
    });
});
