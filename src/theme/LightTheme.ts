import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  typography: {
    fontFamily: '"Averta", sans-seriff',
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#065bd1',
    },
    secondary: {
      main: '#216634',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
  },
});
