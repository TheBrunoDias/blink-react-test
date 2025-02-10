import { describe, expect, vi } from 'vitest';
import { getPassengers } from '../services/getPassengers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { passengersApiResponseMock } from '../mocks/passengersMock';
import { renderHook, waitFor } from '@testing-library/react';
import { usePassengers } from './usePassengers';

vi.mock('../services/getPassengers');

vi.mock('react-router', () => ({
  useOutletContext: () => ({
    auth: { accessToken: 'accessTokenFake', userId: 'userIdFake' },
  }),
}));

const mockedPassengersFn = vi.mocked(getPassengers);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('usePassengers', () => {
  beforeEach(() => {
    client.clear();
    mockedPassengersFn.mockReset();
  });

  it('Should return list of passengers', async () => {
    mockedPassengersFn.mockResolvedValue(passengersApiResponseMock.passengers);

    const { result } = renderHook(() => usePassengers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    expect(result.current.passengers.length).toBe(0);
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.passengers.length).toBe(
        passengersApiResponseMock.passengers.length,
      );

      expect(result.current.passengers[0].passengerId).toBe(
        passengersApiResponseMock.passengers[0].passengerId,
      );

      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });
  });

  it('Should return empty list of passengers and error', async () => {
    mockedPassengersFn.mockRejectedValue(
      new Error('Error requesting passengers, please try again later!'),
    );

    const { result } = renderHook(() => usePassengers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    expect(result.current.passengers.length).toBe(0);
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.passengers.length).toBe(0);
      expect(result.current.error?.message).toEqual(
        'Error requesting passengers, please try again later!',
      );
      expect(result.current.loading).toBeFalsy();
    });
  });
});
