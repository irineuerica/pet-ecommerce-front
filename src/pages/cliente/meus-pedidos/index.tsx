import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useState } from 'react';
import MeusPedidosSection from '../../../sections/meus-pedidos';

const Page = () => {
  return (
    <>
      <Head>
        <title>Meus pedidos</title>
      </Head>
      <Stack>
        <MeusPedidosSection/>
      </Stack>
    </>
  )
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
