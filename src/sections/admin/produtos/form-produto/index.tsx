import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../../../../components/FormInputText ';
import { FormSelect, FormSelectOptions } from '../../../../components/FormSelect';
import { PATH_ADMIN } from '../../../../routes/paths';
import { useRouter } from 'next/router';
import { useProduto } from '@modules/produtos/hooks/useProduto';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import { useEffect, useState } from 'react';

export default function FormProduto() {
  const router = useRouter();
  const { produto } = router?.query;
  const [opcoesCategorias, setOpcoesCategorias] = useState<FormSelectOptions>()
  const {
    handleCriarProduto,
    handleCriarProdutoIsLoading,
    handleAlterarProduto,
    handleAlterarProdutoIsLoading,
    handleShowProduto,
    categorias, categoriasIsLoading
  } = useProduto();
  const methods = useForm();
  const theme = useTheme();

  async function getDetails() {
    if (produto) {
      const id = Number(produto);
      const dadosProduto = await handleShowProduto(id);
      methods.reset({...dadosProduto, categoria: dadosProduto.categoria.id});
    }
  }

  useEffect(() => {
    if (produto) {
      getDetails();
    }
  }, [produto]);

  useEffect(() => {
    if (categorias) {
      setCategorias();
    }
  }, [categorias]);

  const submitProduto: SubmitHandler<ProdutoInterface> = async (produto) => {
    try {
      if (produto.id) {
        await handleCriarProduto(produto);
      } else {
        await handleAlterarProduto(produto);
      }
      router.push(PATH_ADMIN.produtos);
    } catch (err) {
      throw err;
    }
  };

  function setCategorias(){
    if(categorias){
      const opcoes = categorias.map((categoria) => {
        return {value: categoria.id, label: categoria.nome}
      })
      setOpcoesCategorias(opcoes)
    }
  }

  
  return (
    <FormProvider {...methods}>
      <Typography fontWeight="bold" color={theme.palette.secondary.main} fontSize={20}>
        Informações produto
      </Typography>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12} md={12}>
          <FormInputText name="nome" label="Nome" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInputText name="descricao" label="Descrição" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormSelect name="categoria" options={opcoesCategorias || []} label="Categoria" />
        </Grid>
      </Grid>
      <Stack flexDirection="row">
        <Button
          color="error"
          fullWidth
          variant="contained"
          sx={{ mr: 1 }}
          onClick={() => router.push(PATH_ADMIN.produtos)}
        >
          Voltar
        </Button>
        <LoadingButton
          loading={handleAlterarProdutoIsLoading || handleCriarProdutoIsLoading}
          fullWidth
          variant="contained"
          onClick={() => {
            // @ts-ignore
            methods.handleSubmit(submitProduto, (e) => {
              console.error(e);
            })();
          }}
          sx={{ ml: 1 }}
        >
          Salvar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
