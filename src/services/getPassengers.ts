import { AxiosError } from 'axios';
import { z } from 'zod';
import { api, ApiErrorProps } from '../lib/api';
import { passengerSchema } from '../schemas/passengerSchema';

export type PassengerProps = z.infer<typeof passengerSchema>;

interface PassengerResponseProps {
  passengers: PassengerProps[];
}

export async function getPassengers(accessToken: string, userId: string) {
  try {
    const { data } = await api.get<PassengerResponseProps>(
      '/travel/passengers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          userId,
        },
      },
    );

    return data.passengers.map((passenger) => passengerSchema.parse(passenger));
  } catch (error) {
    const e = error as AxiosError<ApiErrorProps>;
    throw new Error(
      e.response?.data?.message ??
        'Error requesting passengers, please try again later!',
    );
  }
}
