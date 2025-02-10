import { differenceInMinutes } from 'date-fns';

export function calculateFlightDuration(embarkDate: Date, arrivalDate: Date) {
  const diffInMinutes = differenceInMinutes(arrivalDate, embarkDate);

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours}h ${minutes}`;
}
