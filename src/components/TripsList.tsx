import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTrips } from '../hooks/useTrips';
import { FlightCard } from './FlightCard';

export function TripsList() {
  const { error, loading, trips } = useTrips();

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
      aria-labelledby="Trips List"
      sx={{
        p: 1,
        height: '600px',
        overflow: 'auto',
      }}
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

      {trips.map((trip) => (
        <FlightCard key={trip.flight.flightId} {...trip} />
      ))}
    </Stack>
  );
}
