import { Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import ProductCard from 'src/components/ProductCard';
import { useProduto } from '../modules/produtos/hooks/useProduto';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';

const Page = () => {
  const theme = useTheme();
  const { produtos, isLoading } = useProduto();
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Liro Pet Shop</title>
      </Head>
      <Stack>
        <TextField label={'Pesquisar produtos'} variant={'filled'} sx={{ mx: 2 }} />
        <TabContext value={value}>
          <Box sx={{ pt: 1, borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <TabList
              aria-label="Tabs example"
              onChange={handleChange}
              sx={{ width: '100%', backgroundColor: theme.palette.grey[50] }}
            >
              <Tab label="Cachorro" value="1" sx={{ width: '25%' }} />
              <Tab label="Gato" value="2" sx={{ width: '25%' }} />
              <Tab label="Pássaro" value="3" sx={{ width: '25%' }} />
              <Tab label="Roedores" value="4" sx={{ width: '25%' }} />
            </TabList>
          </Box>
        </TabContext>
        {/* TODO Aplicar IA para sugestão de produtos
        
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
        </Grid> */}
        {!isLoading && produtos && (
          <Grid container spacing={3} mt={3} px={1}>
            <Grid item xs={12} md={12}>
              <Typography textAlign={'center'} color={'secondary'} fontWeight={'bold'}>
                Produtos
              </Typography>
            </Grid>
            {produtos.map((prod: ProdutoInterface) => (
              <Grid item xs={12} md={4}>
                <ProductCard produto={prod} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
