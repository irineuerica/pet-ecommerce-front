import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Dashboard from '../../../sections/admin/dashboard';

const Page = () => (
  <>
    <Head>
      <title>Dashboard</title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Dashboard />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
