import { AxiosError } from 'axios';
import { api, ApiErrorProps } from '../lib/api';

interface AuthenticationRequestProps {
  email: string;
  password: string;
}

interface AuthenticationResponseBodyProps {
  accessToken: string;
  userId: string;
  accessTokenExpiry: number;
}

export async function getAuthentication(props: AuthenticationRequestProps) {
  try {
    const { data } = await api.post<AuthenticationResponseBodyProps>(
      '/platform/user/login',
      {
        emailAddress: props.email,
        password: props.password,
        partnerId: 'blink-travel-new',
      },
    );

    return {
      accessToken: data.accessToken,
      userId: data.userId,
      accessTokenExpiry: data.accessTokenExpiry,
    };
  } catch (error) {
    const e = error as AxiosError<ApiErrorProps>;
    throw new Error(
      e.response?.data?.message ?? 'Incorrect username or password.',
    );
  }
}
