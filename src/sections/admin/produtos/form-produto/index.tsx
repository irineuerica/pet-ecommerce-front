import { FormProvider, useForm } from 'react-hook-form';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../../../../components/FormInputText ';
import { FormSelect } from '../../../../components/FormSelect';
import { CategoriaOption } from '../../../../utils/options/form.options';
import { PATH_ADMIN } from '../../../../routes/paths';
import { useRouter } from 'next/router';

export default function FormProduto() {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      nome: 'Produto 01',
      descricao: 'Descrição do produto',
      peso: 1,
      marca: 'Marca 01',
      categoria: 2,
    },
  });
  const theme = useTheme();
  return (
    <FormProvider {...methods}>
      <Typography fontWeight="bold" color={theme.palette.secondary.main} fontSize={20}>
        Novo Produto
      </Typography>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12} md={12}>
          <FormInputText name="nome" label="Nome" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInputText name="descricao" label="Descrição" />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormInputText name="peso" label="Peso" type={'number'} />
        </Grid>
        <Grid item xs={12} md={10}>
          <FormInputText name="marca" label="Marca" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormSelect name="categoria" options={CategoriaOption} label="Categoria" />
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
        <LoadingButton fullWidth variant="contained" onClick={() => router.push(PATH_ADMIN.produtos)} sx={{ ml: 1 }}>
          Salvar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
