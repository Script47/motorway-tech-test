import {Test, TestingModule} from '@nestjs/testing';
import {VehicleStatesService} from './vehicle-states.service';
import {VehicleStateDto} from './dto/vehicle-state-dto';
import {NotFoundException} from '@nestjs/common';

describe('VehiclesStatesController', () => {
    let vehicleStatesService: VehicleStatesService;

    const mockDto: VehicleStateDto = {
        vehicleId: 3,
        state: 'selling',
        timestamp: '2022-09-12 10:00:00+00',
    };

    const mockVehicleStatesService = {
        findByVehicleIdAndTimestamp: jest
            .fn()
            .mockResolvedValueOnce(mockDto)
            .mockResolvedValue(() => {
                throw new NotFoundException('Vehicle not found.');
            }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleStatesService,
                {
                    provide: VehicleStatesService,
                    useValue: mockVehicleStatesService,
                },
            ],
        }).compile();

        vehicleStatesService =
            module.get<VehicleStatesService>(VehicleStatesService);
    });

    describe('findByVehicleIdAndTimestamp', () => {
        it('should vehicle state', async () => {
            const result = await vehicleStatesService.findByVehicleIdAndTimestamp(
                3,
                '2022-09-12 10:00:00+00',
            );

            expect(result).toEqual(mockDto);
        });

        it('should throw NotFoundException', async () => {
            const result = await vehicleStatesService.findByVehicleIdAndTimestamp(
                999,
                '2022-09-12 10:00:00+00',
            );

            expect(result).toThrowError(NotFoundException);
        });
    });
});
