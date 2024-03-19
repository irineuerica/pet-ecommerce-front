import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PedidosAdmin from '../../../sections/admin/pedidos';
import FormProduto from '../../../sections/admin/produtos/form-produto';

const Page = () => (
  <>
    <Head>
      <title>Produto</title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <FormProduto />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
