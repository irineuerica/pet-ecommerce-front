import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AlterarSenhaSection } from 'src/sections/minha-conta/alterar-senha';

const Page = () => (
  <>
    <Head>
      <title>Alterar senha</title>
    </Head>
    <Stack flexDirection={'row'}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <AlterarSenhaSection />
          </Stack>
        </Container>
      </Box>
      <img
        alt="Friends illustrations by Storyset"
        src="/assets/minha-conta-imagem.png"
        height={'auto'}
        width={'17%'}
        style={{ alignSelf: 'end' }}
      />
    </Stack>
  </>
);

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
