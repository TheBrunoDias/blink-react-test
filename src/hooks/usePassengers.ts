import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import { getPassengers } from '../services/getPassengers';
import { AuthtenticationProps } from './useAuth/AuthContext';

interface OutletContextProps {
  auth: AuthtenticationProps;
}

export function usePassengers() {
  const {
    auth: { accessToken, userId },
  } = useOutletContext<OutletContextProps>();

  const { data, isFetching, error } = useQuery({
    queryKey: ['passengers'],
    queryFn: async () => {
      return await getPassengers(accessToken, userId);
    },
    initialData: [],
  });

  return {
    passengers: data,
    loading: isFetching,
    error,
  };
}
