import { Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Tabs, Tab } from '@mui/material';
import { PRODUTO_MOCK } from 'src/mocks/produtos.mock';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import ProductCard from 'src/components/ProductCard';

const Page = () => {
  const [value, setValue] = useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
  <>
    <Head>
      <title>Teste</title>
    </Head>
    <Stack>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label='Tabs example' onChange={handleChange}>
            <Tab label='Cachorro' value='1'/>
            <Tab label='Gato' value='2'/>
            <Tab label='Pássaro' value='3'/>
            <Tab label='Roedores' value='4'/>
          </TabList>
        </Box>
        <TabPanel value='1'>Panel One</TabPanel>
        <TabPanel value='2'>Panel Two</TabPanel>
        <TabPanel value='3'>Panel Three</TabPanel>
        <TabPanel value='4'>Panel Four</TabPanel>
      </TabContext>
      <div>
        {PRODUTO_MOCK.map((e) => (
          <ProductCard 
            id={e.id} 
            nome={e.nome} 
            descricao={e.descricao} 
            valor={e.valor} 
            categoria_id={e.categoria_id}
          />
        ))}
      </div>
    </Stack>
  </>
  )
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
