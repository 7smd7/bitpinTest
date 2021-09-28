import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';


// A custom theme for this app
const theme = createTheme({
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
    background: {
      default: "#070b49"
    },
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
