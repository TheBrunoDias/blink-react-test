import { describe, it } from 'vitest';
import { calculateFlightDuration } from './calculateFlightDuration';

describe('Calculate Flight Duration', () => {
  it('Should calculate the flight duration', () => {
    const embarkDate = new Date('2025-02-09T22:15:00.000Z');
    const arrivalDate = new Date('2025-02-09T23:30:00.000Z');

    const result = calculateFlightDuration(embarkDate, arrivalDate);

    expect(result).toEqual('1h 15');
  });
});
