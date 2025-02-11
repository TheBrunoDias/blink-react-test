import { Flight } from '@mui/icons-material';
import { Box, Chip, Divider, Grid2 as Grid, Typography } from '@mui/material';
import { calculateFlightDuration } from '../utils/calculateFlightDuration';
import { formatDateToLocalDateString } from '../utils/formatDate';
import { FLightInfoDialog } from './FlightInfoDialog';
import { FlightTripsProps } from '../hooks/useTrips';

export function FlightCard({
  flight,
  delayed,
  passengersNames,
}: FlightTripsProps) {
  return (
    <Box
      aria-label="Flight Card"
      sx={{
        p: 2,
        borderRadius: 1,
        color: 'secondary.main',
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Flight
          color="secondary"
          fontSize="medium"
          sx={{
            rotate: '90deg',
            border: '1px solid',
            borderRadius: '100%',
            borderColor: 'secondary.main',
            p: '2px',
          }}
        />
        <Typography>{flight.flightNumber}</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography>
          {formatDateToLocalDateString(flight.embarkDate)}
        </Typography>
        {delayed && (
          <Chip label="Delayed" color="warning" sx={{ fontWeight: '700' }} />
        )}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <FLightInfoDialog
            delayed={delayed}
            flight={flight}
            passengersNames={passengersNames}
          />
        </Box>
      </Box>
      <Grid container sx={{ mt: 3 }}>
        <Grid size="auto">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '14px' }}>
              {formatDateToLocalDateString(flight.embarkDate, 'HH:mm')}
            </Typography>
            <Typography component="p" variant="h1" sx={{ fontWeight: 800 }}>
              {flight.origin}
            </Typography>
            <Typography>{flight.originAirport}</Typography>
          </Box>
        </Grid>
        <Grid
          size="grow"
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              top: '50%',
              transform: 'translateY(-100%)',
              left: 0,
              borderBottom: '1px dashed',
              borderColor: 'secondary.main',
              zIndex: 0,
            }}
          />
          <Box
            component="span"
            sx={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: '700',
              fontSize: '14px',
              zIndex: 1,
            }}
          >
            {calculateFlightDuration(flight.embarkDate, flight.arrivalDate)}
          </Box>
          <Flight
            color="secondary"
            fontSize="large"
            sx={{
              rotate: '90deg',
            }}
          />
        </Grid>
        <Grid size="auto">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography sx={{ fontSize: '14px' }}>
              {formatDateToLocalDateString(flight.arrivalDate, 'HH:mm')}
            </Typography>
            <Typography component="p" variant="h1" sx={{ fontWeight: 800 }}>
              {flight.destination}
            </Typography>
            <Typography>{flight.destinationAirport}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
