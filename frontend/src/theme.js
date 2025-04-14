import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#0d1117',
              paper: '#161b22',
            },
            text: {
              primary: '#c9d1d9',
              secondary: '#8b949e',
            },
          }
        : {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#24292e',
              secondary: '#57606a',
            },
          }),
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });
