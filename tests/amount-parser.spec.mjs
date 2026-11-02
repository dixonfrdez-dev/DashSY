import { test, expect } from '@playwright/test';
import { parseLocalizedNumber } from '../js/number-parser.mjs';

const validCases = [
    ['1.022,99', 1022.99],
    ['1022,99', 1022.99],
    ['1,022.99', 1022.99],
    ['1.022', 1.022],
    ['1 022,99', 1022.99],
];
for (const [input, expected] of validCases) {
    test('parses ' + input + ' as ' + expected, () => {
        expect(parseLocalizedNumber(input)).toBe(expected);
    });
}

test('rejects empty or malformed values instead of partially parsing them', () => {
    expect(parseLocalizedNumber('')).toBeNull();
    expect(parseLocalizedNumber('not a number')).toBeNull();
    expect(parseLocalizedNumber('1,022,99')).toBeNull();
});
