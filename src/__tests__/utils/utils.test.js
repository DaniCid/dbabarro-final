import { formatLanguage, formatReleaseDate, round, filterName, handleNullImage, handleNullTitle, handleNullDate, handleNullRating, isEmpty } from '../../utils/utils'

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

// FILTERS

test('Filter return name if object has a name & no title', () => {
    const item = { name: 'Dani' }
    expect(filterName(item)).toBe('Dani');
});

test('Filter return title if object has a title & no name', () => {
    const item = { title: 'Edgerunners' }
    expect(filterName(item)).toBe('Edgerunners');
});

// DATA CONTROL

test('Return path + img if the img is not null', () => {
    expect(handleNullImage('img', 'path')).toBe('pathimg');
});

test('Return default image if the img is null', () => {
    const imageUnavailable = 'imageUnavailable.jpg'
    expect(handleNullImage(null, 'path')).toBe(imageUnavailable);
});

test('Return default image for profile if the img is null and we pass a type', () => {
    const profileUnavailable = 'profileUnavailable.jpg'
    expect(handleNullImage(null, 'path', 'type')).toBe(profileUnavailable);
});

test('Return title if there is one', () => {
    expect(handleNullTitle('title')).toBe('title');
});

test('Return default msg if no title', () => {
    expect(handleNullTitle(null)).toBe('No Title');
});

test('Return date if not empty', () => {
    expect(handleNullDate('2022')).toBe('2022');
});

test('Return default msg if no date', () => {
    expect(handleNullDate(undefined)).toBe('Date Unavailable');
});

test('Return rating if not null', () => {
    expect(handleNullRating('8.1')).toBe('8.1');
});

test('Return default msg if rating is null', () => {
    expect(handleNullRating(null)).toBe('-');
});

test('Return true if object is empty', () => {
    const item = {}
    expect(isEmpty(item)).toBe(true);
});

test('Return false if object is not empty', () => {
    const item = { title: 'Edgerunners' }
    expect(isEmpty(item)).toBe(false);
});