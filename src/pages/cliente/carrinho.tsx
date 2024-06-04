import { Box, Container, Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React from 'react';
import MeuCarrinhoSection from 'src/sections/carrinho-section';

const Page = () => {
  return (
    <>
      <Head>
        <title>Carrinho</title>
      </Head>
      <Stack flexDirection={'row'} sx={{ minHeight: '100%' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pl: 2,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <MeuCarrinhoSection />
            </Stack>
          </Container>
        </Box>
        <img
          alt="Friends illustrations by Storyset"
          src="/assets/illustrations/adopt.png"
          height={'auto'}
          width={'17%'}
          style={{ alignSelf: 'end' }}
        />
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
