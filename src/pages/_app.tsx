import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';

const clientSideEmotionCache = createEmotionCache();

const App = (props: { Component: any; emotionCache?: EmotionCache | undefined; pageProps: any }) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Pet E-commerce</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
