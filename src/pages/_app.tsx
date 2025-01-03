import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { DialogConfirmationProvider } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import { PedidoProvider } from '@modules/pedido/contexts/PedidoContext';
import { ProdutoProvider } from '@modules/produtos/context/produtoContext';
import { AuthProvider } from '@modules/auth/login/contexts/authContext';

const clientSideEmotionCache = createEmotionCache();

const App = (props: { Component: any; emotionCache?: EmotionCache | undefined; pageProps: any }) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const queryClient = new QueryClient();

  useNProgress();

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Liro E-commerce</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <DialogConfirmationProvider>
            <SnackbarProvider>
              <AuthProvider>
                <ProdutoProvider>
                  <PedidoProvider>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </PedidoProvider>
                </ProdutoProvider>
              </AuthProvider>
            </SnackbarProvider>
          </DialogConfirmationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
};

export default App;
