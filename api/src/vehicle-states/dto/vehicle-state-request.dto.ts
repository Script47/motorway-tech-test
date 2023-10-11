import {DateValidator} from '../validators/date.validator';

export class VehicleStateRequestDto {
    @DateValidator()
    timestamp: string;
}
