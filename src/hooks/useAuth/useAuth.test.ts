import { describe, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { getAuthentication } from '../../services/authentication';
import { authenticationApiResponseMock } from '../../mocks/authenticationMock';
import { useAuth } from '.';
import { AuthProvider } from './AuthProvider';

vi.mock('../../services/authentication');
const mockedAuthFn = vi.mocked(getAuthentication);

describe('useAuth', () => {
  it('Should set auth state on login', async () => {
    mockedAuthFn.mockResolvedValue(authenticationApiResponseMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      return await result.current.login({
        email: 'teste@teste.com',
        password: 'test123',
      });
    });

    expect(result.current.auth?.accessToken).toEqual(
      authenticationApiResponseMock.accessToken,
    );

    expect(result.current.auth?.userId).toEqual(
      authenticationApiResponseMock.userId,
    );
  });

  it('Should return success equal true on login', async () => {
    mockedAuthFn.mockResolvedValue(authenticationApiResponseMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const loginResult = await act(async () => {
      return await result.current.login({
        email: 'teste@teste.com',
        password: 'test123',
      });
    });

    expect(loginResult.success).toBeTruthy();
  });

  it('Should return success equal false and error message in case of login failure', async () => {
    mockedAuthFn.mockRejectedValue(
      new Error('Incorrect username or password.'),
    );

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const loginResult = await act(async () => {
      return await result.current.login({
        email: 'teste@teste.com',
        password: 'test123',
      });
    });

    expect(loginResult.success).toBeFalsy();
    expect(loginResult.message).toEqual('Incorrect username or password.');
  });

  it('Should set auth state to null on logout', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.logout());

    expect(result.current.auth).toBeNull();
  });
});
