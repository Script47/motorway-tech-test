import {validate} from 'class-validator';
import {DateValidator} from './date.validator';

class TestClass {
    @DateValidator()
    date: string;
}

describe('DateValidator', () => {
    it('should validate a valid date format', async () => {
        const testObj = new TestClass();
        testObj.date = '2022-09-12 10:00:00+00';

        const errors = await validate(testObj);
        expect(errors.length).toBe(0);
    });

    it('should fail on an invalid date format', async () => {
        const testObj = new TestClass();
        testObj.date = 'invalid_date_format';

        const errors = await validate(testObj);
        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toHaveProperty(
            'DateValidator',
            'Invalid date format. Use format (encoded): 0000-00-00 00:00:00+00'
        );
    });
});
