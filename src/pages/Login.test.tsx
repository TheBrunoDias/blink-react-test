import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, vi } from 'vitest';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../hooks/useAuth/AuthProvider';
import Login from './Login';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

const useAuthMocked = vi.mocked(useAuth);

describe('Login Page', () => {
  beforeEach(() => {
    useAuthMocked.mockReset();
    client.clear();
  });

  it('Should show credential errors on parse', async () => {
    useAuthMocked.mockReturnValue({
      auth: null,
      logout: vi.fn(),
      login: vi.fn(),
    });

    render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/e.g youremail@email.uk/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(emailInput, { target: { value: 'email@email' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('Should call login function when click the button', async () => {
    const mockLogin = vi.fn();
    mockLogin.mockReturnValue({ success: true });
    useAuthMocked.mockReturnValue({
      auth: null,
      logout: vi.fn(),
      login: mockLogin,
    });

    render(
      <QueryClientProvider client={client}>
        <AuthProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/e.g youremail@email.uk/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123123' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'email@email.com',
      password: '123123',
    });
  });

  it('Should show login error message on login error', async () => {
    useAuthMocked.mockReturnValue({
      auth: null,
      logout: vi.fn(),
      login: async () => ({ success: false, message: 'Error Message' }),
    });

    render(
      <QueryClientProvider client={client}>
        <AuthProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/e.g youremail@email.uk/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123123' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Error Message/i)).toBeInTheDocument();
    });
  });
});
