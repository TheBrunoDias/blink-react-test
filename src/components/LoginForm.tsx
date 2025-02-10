import { InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export type LoginFormErrorsProps = Partial<{
  email: string;
  password: string;
  login: string;
}>;

interface LoginFormContentProps {
  errors: LoginFormErrorsProps;
  loading: boolean;
  updateErrors: (e: LoginFormErrorsProps) => void;
}

export function LoginFormContent({
  errors,
  loading,
  updateErrors,
}: LoginFormContentProps) {
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FormControl fullWidth>
        <Box
          component="label"
          htmlFor="email"
          sx={{ display: 'flex', alignItems: 'center', gap: '2px', mb: 1 }}
        >
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
            Your email
          </Box>
          <Tooltip title="Enter your e-email">
            <InfoOutlined fontSize="inherit" />
          </Tooltip>
        </Box>
        <TextField
          type="email"
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          id="email"
          name="email"
          placeholder="e.g youremail@email.uk"
          onChange={() => updateErrors({ email: '' })}
        />
      </FormControl>

      <FormControl fullWidth>
        <Box
          component="label"
          htmlFor="Password"
          sx={{ display: 'flex', alignItems: 'center', gap: '2px', mb: 1 }}
        >
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
            Password
          </Box>
          <Tooltip title="Enter your password you use to log in to your account">
            <InfoOutlined fontSize="inherit" />
          </Tooltip>
        </Box>
        <TextField
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          onChange={() => updateErrors({ password: '' })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>

      <Box sx={{ alignSelf: 'flex-end' }}>
        <Button
          LinkComponent="a"
          href="https://travel-sandbox-new.blinkinnovation.co/forgotPassword"
          target="_blank"
        >
          Forgot Password?
        </Button>
      </Box>

      <Box>
        <Typography
          color="error"
          sx={{ textAlign: 'center', fontWeight: '400' }}
        >
          {errors.login}
        </Typography>
      </Box>

      <Button
        aria-label="Log In"
        loading={loading}
        type="submit"
        variant="contained"
        sx={{ color: '#fff' }}
      >
        Log In
      </Button>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Typography>Don&apos;t have an account?</Typography>
        <Button
          LinkComponent="a"
          href="https://travel-sandbox-new.blinkinnovation.co/register"
          target="_blank"
        >
          Create an account
        </Button>
      </Box>
    </>
  );
}
