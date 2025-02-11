import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { useTrips } from '../hooks/useTrips';
import { TripsList } from './TripsList';

vi.mock('../hooks/useTrips');

const useTripsMock = vi.mocked(useTrips);

describe('Trip List', () => {
  beforeEach(() => {
    useTripsMock.mockReset();
  });

  it('Should Show loading spinner if loading is true', async () => {
    useTripsMock.mockReturnValue({
      error: null,
      loading: true,
      trips: [],
    });

    render(<TripsList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('Should hide loading spinner if loading is true', async () => {
    useTripsMock.mockReturnValue({
      error: null,
      loading: false,
      trips: [],
    });

    render(<TripsList />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('Should show error message if not null', async () => {
    useTripsMock.mockReturnValue({
      error: new Error('Error Message'),
      loading: false,
      trips: [],
    });

    render(<TripsList />);

    expect(screen.getByText(/Error Message/i)).toBeInTheDocument();
  });

  it('Should show Trip Flight Card', async () => {
    useTripsMock.mockReturnValue({
      error: null,
      loading: false,
      trips: [
        {
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
        },
      ],
    });

    render(<TripsList />);

    expect(screen.queryAllByLabelText('Flight Card').length).toEqual(1);
  });
});
