import { vi } from 'vitest';
import { getTrips } from '../services/getTrips';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tripApiResponseMock } from '../mocks/tripsMock';
import { useTrips } from './useTrips';
import { renderHook, waitFor } from '@testing-library/react';
import { tripSchema } from '../schemas/flightSchema';

vi.mock('../services/getTrips');

vi.mock('react-router', () => ({
  useOutletContext: () => ({
    auth: { accessToken: 'accessTokenFake', userId: 'userIdFake' },
  }),
}));

const mockedTripsFn = vi.mocked(getTrips);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tripMockValue = tripApiResponseMock.trips.map((t) => tripSchema.parse(t));

describe('useTrips', () => {
  beforeEach(() => {
    client.clear();
    mockedTripsFn.mockReset();
  });

  it('Should return list of Trips', async () => {
    mockedTripsFn.mockResolvedValue(tripMockValue);

    const flightsLength = tripMockValue.reduce(
      (acc, curr) => acc + curr.flights.length,
      0,
    );

    const { result } = renderHook(() => useTrips(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    expect(result.current.trips.length).toBe(0);
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.trips.length).toBe(flightsLength);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });
  });

  it('Should return empty list of trips and error', async () => {
    mockedTripsFn.mockRejectedValue(
      new Error('Error requesting trips, please try again later!'),
    );

    const { result } = renderHook(() => useTrips(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.trips.length).toBe(0);
      expect(result.current.error?.message).toEqual(
        'Error requesting trips, please try again later!',
      );
    });
  });
});
