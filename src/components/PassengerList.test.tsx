import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { PassengersList } from './PassengersList';
import { usePassengers } from '../hooks/usePassengers';

vi.mock('../hooks/usePassengers');

const usePassengersMock = vi.mocked(usePassengers);

describe('Passengers List', () => {
  beforeEach(() => {
    usePassengersMock.mockReset();
  });

  it('Should Show loading spinner if loading is true', async () => {
    usePassengersMock.mockReturnValue({
      error: null,
      loading: true,
      passengers: [],
    });

    render(<PassengersList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('Should hide loading spinner if loading is true', async () => {
    usePassengersMock.mockReturnValue({
      error: null,
      loading: false,
      passengers: [],
    });

    render(<PassengersList />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('Should show error message if not null', async () => {
    usePassengersMock.mockReturnValue({
      error: new Error('Error Message'),
      loading: false,
      passengers: [],
    });

    render(<PassengersList />);

    expect(screen.getByText(/Error Message/i)).toBeInTheDocument();
  });

  it('Should show Passengers List', async () => {
    usePassengersMock.mockReturnValue({
      error: null,
      loading: false,
      passengers: [
        {
          mobilePhoneNumber: 'mobilePhoneNumber 1',
          name: 'Test 1',
          passengerId: '1',
          surname: 'test',
        },
        {
          mobilePhoneNumber: 'mobilePhoneNumber 2',
          name: 'Test 2',
          passengerId: '2',
          surname: 'test 2',
        },
      ],
    });

    render(<PassengersList />);

    expect(
      screen.queryAllByLabelText('Passenger Card', { selector: 'div' }).length,
    ).toEqual(2);
  });
});
