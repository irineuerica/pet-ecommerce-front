import React from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FormDadosPedido from '../../sections/form-dados-pedido';

const Page = () => {
  return (
    <>
      <Head>
        <title>Carrinho</title>
      </Head>
      <Stack>
        <FormDadosPedido />
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
