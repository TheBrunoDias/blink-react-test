import { AxiosError } from 'axios';
import { z } from 'zod';
import { api, ApiErrorProps } from '../lib/api';
import { flightSchema, tripSchema } from '../schemas/flightSchema';

export type FlightProps = z.infer<typeof flightSchema>;

export type TripProps = z.infer<typeof tripSchema>;

interface TripResponseProps {
  trips: TripProps[];
}

export async function getTrips(accessToken: string, userId: string) {
  try {
    const { data } = await api.get<TripResponseProps>('/travel/trips', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        userId,
      },
    });

    return data.trips.map((trip) => tripSchema.parse(trip));
  } catch (error) {
    const e = error as AxiosError<ApiErrorProps>;

    throw new Error(
      e.response?.data?.message ??
        'Error requesting trips, please try again later!',
    );
  }
}
