import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { GeneroEnum } from 'src/constants/enums/genero.enum';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputText } from 'src/components/FormInputText ';
import { FormInputDate } from 'src/components/FormInputDate';
import { FormSelect } from 'src/components/FormSelect';

interface CardInformacoesBasicasProps {
  titulo: string;
  isEdit?: boolean;
}

export default function CardInformacoesBasicas({ titulo, isEdit }: CardInformacoesBasicasProps) {
  const methods = useForm();

  const generoOptions = [
    { label: GeneroEnum.FEMININO, value: GeneroEnum.FEMININO },
    { label: GeneroEnum.MASCULINO, value: GeneroEnum.MASCULINO },
    { label: GeneroEnum.OUTRO, value: GeneroEnum.OUTRO },
  ];

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader title={titulo} />
        <CardContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormInputText name="nome" label="Nome" />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormInputText name="email" label="E-mail" />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormInputText name="ddd" label="DDD" />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormInputText name="telefone" label="Celular" mask={{ format: '99' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect name="genero" options={generoOptions} label="Gênero" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputDate name="dataNascimento" label="Data de nascimento" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputText name="cpf" label="CPF" mask={{ format: '999.999.999-99' }} disabled={isEdit} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputText name="senha" label="Senha" type="password" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputText name="confirmarSenha" label="Confirmar senha" type="password" />
            </Grid>
          </Grid>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end', pt: 5 }}>
            <Button fullWidth variant="contained">
              {isEdit ? 'Salvar' : 'Cadastrar'}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
