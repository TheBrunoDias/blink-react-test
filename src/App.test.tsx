import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import App from './App';
import { useAuth } from './hooks/useAuth';

vi.mock('./hooks/useAuth');

const useAuthMocked = vi.mocked(useAuth);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Protected Routes', () => {
  it('Should redirect to home if not authenticated', async () => {
    useAuthMocked.mockReturnValue({
      ...useAuth(),
      auth: null,
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Sign In To Your Account/i)).toBeInTheDocument();
  });

  it('Should allow access to the dashboard if authenticated', async () => {
    useAuthMocked.mockReturnValue({
      ...useAuth(),
      auth: { accessToken: 'accessTokenFake', userId: 'userIdFake' },
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
  });
});
