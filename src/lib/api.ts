import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sandbox.blinkapi.co/v1/',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X',
  },
});

export interface ApiErrorProps {
  code: string;
  type: string;
  errors?: {
    errror: string;
    field: string;
  }[];
  message: string;
}
