import { describe, expect, it, vi } from 'vitest';
import { api } from '../lib/api';
import { authenticationApiResponseMock } from '../mocks/authenticationMock';
import { getAuthentication } from './authentication';

vi.mock('../lib/api');
const mockedApiPost = vi.mocked(api.post);

describe('Authentication', () => {
  it('Should return data when credentials are correct', async () => {
    mockedApiPost.mockResolvedValue({ data: authenticationApiResponseMock });

    const result = await getAuthentication({
      email: 'test@test.com',
      password: 'test123',
    });

    expect(result.userId).toEqual(authenticationApiResponseMock.userId);
  });

  it('Should throw error when credentials are invalid', async () => {
    mockedApiPost.mockRejectedValue({
      data: { message: 'Incorrect username or password.' },
    });

    const apiCall = getAuthentication({
      email: 'test@test.com',
      password: 'test123',
    });

    await expect(apiCall).rejects.toThrow('Incorrect username or password.');
  });
});
