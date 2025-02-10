import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedLayout() {
  const { auth, logout } = useAuth();

  return auth ? (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          minHeight: '100dvh',
          flexDirection: 'column',
        }}
      >
        <AppBar
          color="transparent"
          position="static"
          sx={{ borderRadius: '2rem', my: 2 }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={logout}>Log out</Button>
          </Toolbar>
        </AppBar>

        <Outlet context={{ auth }} />
      </Container>
    </>
  ) : (
    <Navigate to={'/'} />
  );
}
