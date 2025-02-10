import { z } from 'zod';
import { passengerSchema } from './passengerSchema';

export const flightSchema = z.object({
  flightId: z.string(),
  embarkDate: z.coerce.date(),
  arrivalDate: z.coerce.date(),
  origin: z.string(),
  originAirport: z.string(),
  originCountry: z.string(),
  flightNumber: z.string(),
  destination: z.string(),
  destinationAirport: z.string(),
  destinationCountry: z.string(),
});

export const tripSchema = z.object({
  tripId: z.string(),
  flights: z.array(flightSchema),
  passengers: z.array(passengerSchema),
  alerts: z.array(
    z.object({
      alertType: z.string(),
    }),
  ),
});
