import { describe, vi } from 'vitest';
import { api } from '../lib/api';
import { passengersApiResponseMock } from '../mocks/passengersMock';
import { getPassengers } from './getPassengers';

vi.mock('../lib/api');
const mockedApiGet = vi.mocked(api.get);

describe('Get Passengers', () => {
  it('Should return data without error', async () => {
    mockedApiGet.mockResolvedValue({ data: passengersApiResponseMock });

    const result = await getPassengers('accessTokenFake', 'userIdFake');

    expect(result.length).toEqual(passengersApiResponseMock.passengers.length);
    expect(result[0].passengerId).toEqual(
      passengersApiResponseMock.passengers[0].passengerId,
    );
  });

  it('should throw Unauthorized message if not authenticated', async () => {
    mockedApiGet.mockRejectedValue({
      response: { data: { message: 'Unauthorized' } },
    });

    const apiCall = getPassengers('accessTokenFake', 'userIdFake');

    await expect(apiCall).rejects.toThrow('Unauthorized');
  });

  it('should throw generic error message if error', async () => {
    mockedApiGet.mockRejectedValue({});

    const apiCall = getPassengers('accessTokenFake', 'userIdFake');

    await expect(apiCall).rejects.toThrow(
      'Error requesting passengers, please try again later!',
    );
  });
});
