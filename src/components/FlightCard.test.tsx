import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { FlightCard } from './FlightCard';

const flightTripMock = {
  flight: {
    flightId: '9b9fadc0-e5b1-11ef-a17e-09d43b4f606f',
    embarkDate: new Date('2025-02-09T08:00:00.000Z'),
    arrivalDate: new Date('2025-02-09T09:10:00.000Z'),
    origin: 'GMP',
    originAirport: 'Seoul',
    originCountry: 'KR',
    flightNumber: 'ESR207',
    destination: 'CJU',
    destinationAirport: 'Jeju',
    destinationCountry: 'KR',
  },
  delayed: true,
  passengersNames: 'Bruno Dias, Bruno Diass',
};

describe('FlightCard Component', () => {
  it('Should show Defayed tag if flight is delayed', () => {
    render(<FlightCard {...flightTripMock} />);

    expect(screen.getByText(/Delayed/i)).toBeInTheDocument();
  });

  it('Should show formated embark and arrival hour', () => {
    render(<FlightCard {...flightTripMock} />);

    expect(screen.getByText(/08:00/i)).toBeInTheDocument();
    expect(screen.getByText(/09:10/i)).toBeInTheDocument();
  });
});
