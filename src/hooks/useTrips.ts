import { useQuery } from '@tanstack/react-query';
import { isBefore } from 'date-fns';
import { useOutletContext } from 'react-router';
import { FlightProps, getTrips, TripProps } from '../services/getTrips';
import { AuthtenticationProps } from './useAuth/AuthContext';

interface OutletContextProps {
  auth: AuthtenticationProps;
}

export interface FlightTripsProps {
  flight: FlightProps;
  passengersNames?: string;
  delayed: boolean;
}

export function useTrips() {
  const {
    auth: { accessToken, userId },
  } = useOutletContext<OutletContextProps>();

  const { data, isFetching, error } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const trips = await getTrips(accessToken, userId);

      const tripsReduced = reduceTrips(trips);

      return sortTrips(tripsReduced);
    },
    initialData: [],
  });

  return {
    trips: data,
    loading: isFetching,
    error,
  };
}

function reduceTrips(trips: TripProps[]) {
  return trips.reduce((acc, curr) => {
    const currFlight = curr.flights?.map<FlightTripsProps>((f) => ({
      flight: f,
      passengersNames:
        curr.passengers
          ?.map((p) => p.name?.concat(' ').concat(p.surname))
          .join(', ') ?? '',
      delayed: curr.alerts.filter((a) => a.alertType === 'DELAY').length > 0,
    }));

    return [...acc, ...(currFlight ? currFlight : [])];
  }, [] as FlightTripsProps[]);
}

function sortTrips(trips: FlightTripsProps[]) {
  return trips.sort((a, b) => {
    const isDateABeforeDateB = isBefore(
      new Date(a.flight.embarkDate),
      new Date(b.flight.embarkDate),
    );

    if (isDateABeforeDateB) return -1;
    return 1;
  });
}
