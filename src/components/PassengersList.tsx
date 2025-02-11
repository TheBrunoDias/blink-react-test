import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { usePassengers } from '../hooks/usePassengers';
import { PassengerCard } from './PassengerCard';

export function PassengersList() {
  const { error, loading, passengers } = usePassengers();

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '600px',
        py: '3rem',
      }}
    >
      <CircularProgress color="primary" size={'3rem'} />
    </Box>
  ) : (
    <Stack
      aria-labelledby="Passengers List"
      sx={{ p: 1, height: '600px', overflow: 'auto' }}
      gap={1}
      divider={<Divider flexItem />}
    >
      {error && (
        <Typography
          color="error"
          sx={{ textAlign: 'center', fontWeight: '400' }}
        >
          {error.message}
        </Typography>
      )}

      {passengers.map((passenger) => (
        <PassengerCard
          key={passenger.passengerId}
          fullName={passenger.name.concat(' ').concat(passenger.surname)}
          phone={passenger.mobilePhoneNumber}
        />
      ))}
    </Stack>
  );
}
