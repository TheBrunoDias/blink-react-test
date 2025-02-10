import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#52b6a9',
    },
    secondary: {
      main: '#2b2960',
    },
    text: {
      primary: '#53566e',
    },
  },
  typography: {
    fontFamily: ['Nunito Sans', 'Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: 35,
    },
    h2: {
      fontSize: 18,
    },
    body1: {
      fontSize: 18,
    },
    button: {
      textTransform: 'none',
      fontWeight: '700',
      fontSize: 18,
    },
  },
});
