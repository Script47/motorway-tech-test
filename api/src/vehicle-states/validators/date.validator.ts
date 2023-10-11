import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from "moment-timezone";

@ValidatorConstraint({ name: 'DateValidator', async: false })
export class DateConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return moment(decodeURIComponent(value), 'YYYY-MM-DD HH:mm:ssZ', true).isValid()
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid date format. Use format (encoded): 0000-00-00 00:00:00+00';
    }
}

export function DateValidator(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: DateConstraint,
        });
    };
}
