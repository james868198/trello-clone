import { createTheme } from '@mui/material/styles';
import { lightBlue, blue } from '@mui/material/colors';

const theme = createTheme({      
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
      light: blue[200],
      main: blue[600],
      dark: blue[700],
      contrastText: '#fff',
    },
    secondary: {
      light: lightBlue[200],
      main: lightBlue[600],
      dark: lightBlue[700],
      contrastText: '#fff',
    },
    info: {
      light: blue[50],
      main: blue[300],
      dark: blue[500],
      contrastText: '#fff',
    }
  },
  // button: {
  //   textTransform: 'none'
  //   // textTransform: 'capitalize'
  // }
});

export default theme;