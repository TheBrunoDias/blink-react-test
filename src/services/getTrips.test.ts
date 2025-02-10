import { describe, vi } from 'vitest';
import { api } from '../lib/api';
import { tripApiResponseMock } from '../mocks/tripsMock';
import { getTrips } from './getTrips';

vi.mock('../lib/api');
const mockedApiGet = vi.mocked(api.get);

describe('Get Trips', () => {
  it('Should return data without error', async () => {
    mockedApiGet.mockResolvedValue({ data: tripApiResponseMock });

    const result = await getTrips('accessTokenFake', 'userIdFake');

    expect(result.length).toEqual(tripApiResponseMock.trips.length);
    expect(result[0].tripId).toEqual(tripApiResponseMock.trips[0].tripId);
  });

  it('should throw Unauthorized message if not authenticated', async () => {
    mockedApiGet.mockRejectedValue({
      response: { data: { message: 'Unauthorized' } },
    });

    const apiCall = getTrips('accessTokenFake', 'userIdFake');

    await expect(apiCall).rejects.toThrow('Unauthorized');
  });

  it('should throw generic error message if error', async () => {
    mockedApiGet.mockRejectedValue({});

    const apiCall = getTrips('accessTokenFake', 'userIdFake');

    await expect(apiCall).rejects.toThrow(
      'Error requesting trips, please try again later!',
    );
  });
});
