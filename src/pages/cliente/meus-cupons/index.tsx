import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TableMeusCupons from '../../../sections/meus-cupons';

const Page = () => (
  <>
    <Head>
      <title>Meus Cupons</title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <TableMeusCupons />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
