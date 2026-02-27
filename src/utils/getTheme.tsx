import { createTheme} from "@mui/material";

export function getTheme(isDayTime: boolean) {
  return createTheme({
    palette: {
      mode: isDayTime ? 'light' : 'dark',
      ...(isDayTime
        ? {
          // Day theme colors
          primary: {
            main: '#1976d2',
          },
          background: {
            default: '#f0f8ff',
            paper: '#ffffff',
          },
          text: {
            primary: '#333333',
          },
        }
        : {
          // Night theme colors
          primary: {
            main: '#90caf9',
          },
          background: {
            default: '#0a192f',
            paper: '#1e3a5f',
          },
          text: {
            primary: '#ffffff',
          },
        }),
    },
  });
}