import { z } from 'zod';

export const passengerSchema = z.object({
  passengerId: z.string(),
  name: z.string(),
  surname: z.string(),
  mobilePhoneNumber: z.string(),
});
