import { Grid } from '@mui/material';
import { FormCheckbox } from 'src/components/FormCheckBox';
import { FormInputText } from 'src/components/FormInputText ';
import { FormSelect } from 'src/components/FormSelect';
import { BandeirasOption } from 'src/utils/options/form.options';

export default function CardDadosCartao() {
  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={12} md={8}>
        <FormInputText name="numero" label="Número cartão" mask={{ format: '9999 9999 9999 9999' }}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormSelect name="bandeira" options={BandeirasOption} label="Bandeira" />
      </Grid>
      <Grid item xs={12} md={8}>
        <FormInputText name="nome" label="Nome" />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormInputText name="vencimentoMes" label="Mês Vencimento" mask={{ format: '9999' }} />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormInputText name="vencimentoAno" label="Ano Vencimento" mask={{ format: '9999' }} />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormCheckbox name="principal" label="Cartão princial" />
      </Grid>
    </Grid>
  );
}
