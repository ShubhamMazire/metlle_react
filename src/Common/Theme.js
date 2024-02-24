import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#424955',
    },
    secondary: {
      main: '#535ce8',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#424955',
      secondary: '#535ce8',
      hint: '#8f95ef',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
};

const theme = createTheme(themeOptions);

export default theme;