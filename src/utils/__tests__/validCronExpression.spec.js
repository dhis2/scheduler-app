import isValidCronExpression from '../validCronExpression';

describe('cron expression validation', () => {
    test('should approve wildcard "*" and undefined "?" fields', () => {
        expect(isValidCronExpression('* * * * * *')).toBe(true);
        expect(isValidCronExpression('* * * ? * ?')).toBe(true);
    });

    test('should approve numeric fields', () => {
        expect(isValidCronExpression('1 1 1 1 1 1')).toBe(true);
        expect(isValidCronExpression('59 59 23 31 12 7')).toBe(true);
        expect(isValidCronExpression('59 59 23 31 12 7')).toBe(true);
        expect(isValidCronExpression('59 59 23 31 12 7')).toBe(true);
    });

    test('should approve ranges of numeric fields', () => {
        expect(isValidCronExpression('1-59 1-59 0-23 0-31 1-12 1-7')).toBe(true);
    });

    test('should approve alphabetic month- and weekday fields', () => {
        expect(isValidCronExpression('* * * * JAN MON')).toBe(true);
        expect(isValidCronExpression('* * * * JAN-FEB MON-TUE')).toBe(true);
    });

    test('should approve fractions in fields', () => {
        expect(isValidCronExpression('1/1 1/4 1/23 * * *')).toBe(true);
        expect(isValidCronExpression('* */2 * * * *')).toBe(true);
    });

    test('should deny alphabetic month- and weekday fields in the wrong order', () => {
        expect(isValidCronExpression('* * * * FEB-JAN MON')).toBe(false);
        expect(isValidCronExpression('* * * * JAN WED-TUE')).toBe(false);
    });

    test('should deny fields outside boundary', () => {
        expect(isValidCronExpression('60 * * * * *')).toBe(false);
        expect(isValidCronExpression('* 60 * * * *')).toBe(false);
        expect(isValidCronExpression('* * 24 * * *')).toBe(false);
        expect(isValidCronExpression('* * * 32 * *')).toBe(false);
        expect(isValidCronExpression('* * * * 13 *')).toBe(false);
        expect(isValidCronExpression('* * * * * 8')).toBe(false);
    });

    test('should deny invalid ranges of numeric fields', () => {
        expect(isValidCronExpression('1-60 * * * * *')).toBe(false);
        expect(isValidCronExpression('30-29 * * * * *')).toBe(false);
    });
});
