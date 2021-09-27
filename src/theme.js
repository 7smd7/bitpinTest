import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';


// A custom theme for this app
const theme = createTheme({
  backgroundColor: 'rgb(5, 165, 165)',
  direction: 'rtl',
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
},faIR,);

export default theme;
