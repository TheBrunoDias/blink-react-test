import { Grid2 as Grid, Paper } from '@mui/material';
import { PassengersList } from '../components/PassengersList';
import { TitleHeader } from '../components/TitleHeader';
import { TripsList } from '../components/TripsList';

export default function Dashboard() {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
        }}
        alignItems="stretch"
        justifyContent="center"
      >
        <Grid size={{ lg: 8, xs: 12 }}>
          <Paper
            elevation={2}
            sx={{
              height: '100%',
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
            }}
          >
            <TitleHeader title="Trips" />
            <TripsList />
          </Paper>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Paper
            elevation={2}
            sx={{
              height: '100%',
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
            }}
          >
            <TitleHeader title="Passengers" />
            <PassengersList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
