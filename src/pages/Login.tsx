import { Box, Container, Stack, Typography } from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import {
  LoginFormContent,
  LoginFormErrorsProps,
} from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

const loginFormSchema = z.object({
  email: z.string().email().nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrorsProps>({
    email: '',
    password: '',
    login: '',
  });

  const updateErrors = useCallback((e: LoginFormErrorsProps) => {
    setErrors((prev) => ({ ...prev, ...e }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      const result = loginFormSchema.safeParse(data);

      if (!result.success) {
        const errorsFormat = result.error.format();
        updateErrors({
          email: errorsFormat.email?._errors.join(', '),
          password: errorsFormat.password?._errors.join(', '),
        });
        return;
      }

      setLoading(true);
      updateErrors({ email: '', password: '', login: '' });
      const { success, message } = await login(result.data);
      if (message) updateErrors({ login: message });

      if (success) {
        navigate('/dashboard');
      }
      setLoading(false);
    },
    [login, navigate, updateErrors],
  );

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" color="secondary" fontWeight="800">
            Sign In To Your Account
          </Typography>
          <Typography variant="h2" color="secondary" fontWeight="400">
            Please enter your details.
          </Typography>
        </Box>

        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={2}
          sx={{ width: '100%' }}
        >
          <LoginFormContent
            errors={errors}
            loading={loading}
            updateErrors={updateErrors}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
