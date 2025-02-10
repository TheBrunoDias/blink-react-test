import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext, AuthtenticationProps, LoginProps } from './AuthContext';
import { getAuthentication } from '../../services/authentication';
import { useCookies } from 'react-cookie';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    'blinkReactTestToken',
    'blinkReactTestUserId',
  ]);

  const [auth, setAuth] = useState<AuthtenticationProps | null>(() => {
    const { blinkReactTestToken, blinkReactTestUserId } = cookies;
    if (blinkReactTestToken && blinkReactTestUserId) {
      return {
        accessToken: blinkReactTestToken,
        userId: blinkReactTestUserId,
      };
    }

    return null;
  });

  const login = useCallback(
    async (props: LoginProps) => {
      try {
        const token = await getAuthentication(props);
        setCookie('blinkReactTestToken', token.accessToken, {
          expires: new Date(token.accessTokenExpiry * 1000),
        });
        setCookie('blinkReactTestUserId', token.userId, {
          expires: new Date(token.accessTokenExpiry * 1000),
        });
        setAuth(token);
        return {
          success: true,
        };
      } catch (error) {
        const e = error as Error;
        return {
          success: false,
          message: e.message,
        };
      }
    },
    [setCookie],
  );

  const logout = useCallback(() => {
    setAuth(null);
    removeCookie('blinkReactTestToken');
    removeCookie('blinkReactTestUserId');
  }, [removeCookie]);

  useEffect(() => {
    const { blinkReactTestToken, blinkReactTestUserId } = cookies;

    if (blinkReactTestToken && blinkReactTestUserId) {
      setAuth({
        accessToken: blinkReactTestToken,
        userId: blinkReactTestUserId,
      });
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
