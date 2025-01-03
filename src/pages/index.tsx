//@ts-nocheck
import { Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import React, { useContext, useEffect, useState } from 'react';
import ProductCard from 'src/components/ProductCard';
import { useProduto } from '../modules/produtos/hooks/useProduto';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { ProdutoContext } from '@modules/produtos/context/produtoContext';
import useAuth from '@modules/auth/login/hooks/useAuth';

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const { produtos, isLoading } = useProduto();
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { authenticated } = useAuth();
  const { categorias, categoriasIsLoading } = useProduto();
  const { produtosFiltrados, setCategoria, setPesquisa, pesquisa } = useContext(ProdutoContext);


  useEffect(() => {
    if (!authenticated) router.push(PATH_AUTH.login);
  }, [authenticated]);

  return (
    <>
      <Head>
        <title>Liro Pet Shop</title>
      </Head>
      <Stack>
        <TextField
          label={'Pesquisar produtos'}
          variant={'filled'}
          sx={{ mx: 2 }}
          onChange={(texto) => setPesquisa(texto.target.value)}
          value={pesquisa}
        />
        <TabContext value={value}>
          <Box sx={{ pt: 1, borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <TabList
              aria-label="Tabs example"
              onChange={handleChange}
              sx={{ width: '100%', backgroundColor: theme.palette.grey[50] }}
            >
              {categorias?.map((categoria) => (
                <Tab
                  label={categoria.nome}
                  value={categoria.id}
                  sx={{ width: '25%' }}
                  key={`categoria_${categoria.id}`}
                  onClick={() => setCategoria(categoria.id)}
                />
              ))}
            </TabList>
          </Box>
        </TabContext>
        {!isLoading && produtos && (
          <Grid container spacing={3} mt={3} px={1}>
            <Grid item xs={12} md={12}>
              <Typography textAlign={'center'} color={'secondary'} fontWeight={'bold'}>
                Produtos
              </Typography>
            </Grid>
            {produtosFiltrados?.map((prod: ProdutoInterface, index: number) => (
              <Grid item xs={12} md={4}>
                <ProductCard produto={prod} key={`item_carrinho_${index}`} />
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
