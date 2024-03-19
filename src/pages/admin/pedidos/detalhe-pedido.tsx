import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useState } from 'react';
import DetalhePedidoAdminSection from '../../../sections/admin/pedidos/detalhe-pedido';

const Page = () => {
  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>
      <Stack>
        <DetalhePedidoAdminSection/>
      </Stack>
    </>
  )
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
