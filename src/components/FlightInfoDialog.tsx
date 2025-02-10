import { ArrowForward, Close, Flight, Info, Person } from '@mui/icons-material';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid2 as Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { FlightTripsProps } from '../hooks/useTrips';
import { calculateFlightDuration } from '../utils/calculateFlightDuration';
import { formatDateToLocalDateString } from '../utils/formatDate';

export function FLightInfoDialog({
  delayed,
  flight,
  passengersNames,
}: FlightTripsProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="More info">
        <IconButton onClick={handleOpen}>
          <Info color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <Box
            component="header"
            sx={{
              borderRadius: '6px',
              px: 2,
              py: 1,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
              background:
                'linear-gradient(to left, rgb(82, 182, 168) 30%, rgb(43, 41, 96) 90%)',
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    border: '1px solid #fff',
                    borderRadius: '6px',
                    px: {
                      lg: '24px',
                      xs: '12px',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontSize: { lg: '25px', xs: '18px' },
                    }}
                  >
                    {formatDateToLocalDateString(flight.embarkDate, 'd')}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: '500',
                      fontSize: { lg: '20px', xs: '14px' },
                    }}
                  >
                    {formatDateToLocalDateString(flight.embarkDate, 'MMM')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontSize: { lg: '25px', xs: '18px' },
                    }}
                  >
                    {flight.originAirport}
                  </Typography>
                  <ArrowForward />
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontSize: { lg: '25px', xs: '18px' },
                    }}
                  >
                    {flight.destinationAirport}
                  </Typography>
                </Box>
              </Box>
              <Box />
            </Box>
            <IconButton onClick={handleClose}>
              <Close sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
          <Box sx={{ px: 2, color: 'secondary.main' }}>
            <Box
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
                <Chip
                  label="Delayed"
                  color="warning"
                  sx={{ fontWeight: '700' }}
                />
              )}
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
                  <Typography
                    component="p"
                    variant="h1"
                    sx={{ fontWeight: 800 }}
                  >
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
                  {calculateFlightDuration(
                    flight.embarkDate,
                    flight.arrivalDate,
                  )}
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
                    {flight.arrivalDate &&
                      formatDateToLocalDateString(flight.arrivalDate, 'HH:mm')}
                  </Typography>
                  <Typography
                    component="p"
                    variant="h1"
                    sx={{ fontWeight: 800 }}
                  >
                    {flight.destination}
                  </Typography>
                  <Typography>{flight.destinationAirport}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person fontSize="small" />
              <Typography fontSize={14}>
                <b>Passenger(s):</b> {passengersNames}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
