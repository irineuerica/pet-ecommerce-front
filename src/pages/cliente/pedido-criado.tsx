import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React from 'react';
import CriacaoPedido from 'src/sections/admin/pedidos/pedido-criado';
const Page = () => {
  return (
    <>
      <Head>
        <title>Pedido criado com sucesso</title>
      </Head>
      <Stack>
        <CriacaoPedido />
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
