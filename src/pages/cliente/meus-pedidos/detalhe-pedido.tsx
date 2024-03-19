import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useState } from 'react';
import DetalhePedidoSection from 'src/sections/meus-pedidos/detalhe-pedido';
const Page = () => {
  return (
    <>
      <Head>
        <title>Meus pedidos</title>
      </Head>
      <Stack>
        <DetalhePedidoSection/>
      </Stack>
    </>
  )
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
