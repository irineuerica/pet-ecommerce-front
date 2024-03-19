import { Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Tab } from '@mui/material';
import { PRODUTO_MOCK } from 'src/mocks/produtos.mock';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import ProductCard from 'src/components/ProductCard';

const Page = () => {
  const theme = useTheme();
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const mock = [{
    id: 1,
    nome: 'Produto 01',
    descricao:
      'Produto 01',
    valor: 50.00,
    categoria_id: 2,
  },
    {
      id: 1,
      nome: 'Produto 02',
      descricao:
        'Produto 02',
      valor: 52.00,
      categoria_id: 2,
    },
    {
      id: 1,
      nome: 'Produto 03',
      descricao:
        'Produto 03',
      valor: 53.00,
      categoria_id: 2,
    },
    {
      id: 1,
      nome: 'Produto 04',
      descricao:
        'Produto 04',
      valor: 54.00,
      categoria_id: 2,
    }]

  return (
    <>
      <Head>
        <title>Liro Pet Shop</title>
      </Head>
      <Stack>
        <TextField label={"Pesquisar produtos"} variant={'filled'} sx={{mx: 2}}/>
        <TabContext value={value}>
          <Box sx={{ pt: 1, borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <TabList aria-label="Tabs example" onChange={handleChange} sx={{ width: '100%', backgroundColor: theme.palette.grey[50]}}>
              <Tab label="Cachorro" value="1" sx={{ width: '25%' }} />
              <Tab label="Gato" value="2" sx={{ width: '25%' }} />
              <Tab label="Pássaro" value="3" sx={{ width: '25%' }} />
              <Tab label="Roedores" value="4" sx={{ width: '25%' }} />
            </TabList>
          </Box>
        </TabContext>
        <Grid container spacing={3}  mt={1} p={1}>
          <Grid item xs={12} md={12}>
            <Typography textAlign={'center'} color={'secondary'} fontWeight={'bold'}>
              Sugestões baseadas no seu perfil
            </Typography>
          </Grid>
          {mock.map((e) => (
            <Grid item xs={12} md={3}>
              <ProductCard
                id={e.id}
                nome={e.nome}
                descricao={e.descricao}
                valor={e.valor}
                categoria_id={e.categoria_id}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3} mt={3} px={1}>
          <Grid item xs={12} md={12}>
            <Typography textAlign={'center'} color={'secondary'} fontWeight={'bold'}>
              Produtos
            </Typography>
          </Grid>
          {PRODUTO_MOCK.map((e) => (
            <Grid item xs={12} md={3}>
              <ProductCard
                id={e.id}
                nome={e.nome}
                descricao={e.descricao}
                valor={e.valor}
                categoria_id={e.categoria_id}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
