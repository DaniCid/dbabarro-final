import { formatLanguage, formatReleaseDate, round, filterName } from '../../utils/utils'

test('Date return Month + Year given a date. Date as argument.', () => {
    expect(formatReleaseDate('12.12.2022')).toBe('Dec 2022');
});

test('Date return only the year given a date. Date + word year as argument.', () => {
    expect(formatReleaseDate('12.12.2022', 'year')).toBe(2022);
});

test('Date return a placeholder given an incorrect date. Date as argument.', () => {
    expect(formatReleaseDate('Date Unavailable')).toBe('Date Unavailable');
});

test('Round a number to the suited decimal.', () => {
    expect(round(8.3467, 1)).toBe(8.3);
});

test('Round return a placeholder given an incorrect value.', () => {
    expect(round('-', 1)).toBe('-');
});

test('Language return correct ISO3166-1', () => {
    expect(formatLanguage('es-ES')).toBe('ES');
});

test('Language return default (US) if language is not present', () => {
    expect(formatLanguage('jp-JP')).toBe('US');
});

test('Filter return name if object has a name & no title', () => {
    const item = { name: 'Dani' }
    expect(filterName(item)).toBe('Dani');
});

test('Filter return title if object has a title & no name', () => {
    const item = { title: 'Edgerunners' }
    expect(filterName(item)).toBe('Edgerunners');
});