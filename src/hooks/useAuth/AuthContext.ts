import { createContext } from 'react';

export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthtenticationProps {
  accessToken: string;
  userId: string;
}

interface LoginResponseProps {
  success: boolean;
  message?: string;
}

interface AuthContextProps {
  auth: AuthtenticationProps | null;
  login: (props: LoginProps) => Promise<LoginResponseProps>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
