import { describe, it } from 'vitest';
import { formatDateToLocalDateString } from './formatDate';

describe('Format Dates', () => {
  it('Should format the date with the default pattern', () => {
    const date = new Date('2025-02-09T22:15:00.000Z');

    const result = formatDateToLocalDateString(date);

    expect(result).toEqual('Sunday 9 Feb 2025');
  });

  it('Should format the date with the given pattern', () => {
    const date = new Date('2025-02-09T22:15:00.000Z');

    const result = formatDateToLocalDateString(date, 'dd/MM/yyyy');

    expect(result).toEqual('09/02/2025');
  });
});
