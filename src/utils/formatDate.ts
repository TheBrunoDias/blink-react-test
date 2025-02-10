import { format } from 'date-fns';

export function formatDateToLocalDateString(
  date: Date,
  formatStr: string = 'EEEE d MMM yyyy',
) {
  return format(date, formatStr);
}
