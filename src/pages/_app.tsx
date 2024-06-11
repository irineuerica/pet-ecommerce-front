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
import { AuthProvider } from '@modules/auth/login/contexts/authContext';
import { DialogConfirmationProvider } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import { PedidoProvider } from '@modules/pedido/contexts/PedidoContext';
import { ProdutoProvider } from '@modules/produtos/context/produtoContext';

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
        <script src="https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.3/libs/oversea/index.js"></script>
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
