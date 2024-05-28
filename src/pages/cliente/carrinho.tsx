import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useState } from 'react';
import MeuCarrinhoSection from 'src/sections/carrinho-section';

const Page = () => {
  return (
    <>
      <Head>
        <title>Carrinho</title>
      </Head>
      <Stack>
        <MeuCarrinhoSection />
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
