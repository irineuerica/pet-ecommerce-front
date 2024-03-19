import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TableEstoqueAdmin from '../../../sections/admin/estoque';

const Page = () => (
  <>
    <Head>
      <title>Estoque</title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <TableEstoqueAdmin />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
