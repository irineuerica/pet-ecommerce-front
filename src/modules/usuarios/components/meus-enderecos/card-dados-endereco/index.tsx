import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from 'src/components/FormCheckBox';
import { FormInputText } from 'src/components/FormInputText ';
import { FormSelect } from 'src/components/FormSelect';
import {
  EstadosOption,
  TipoLogradouroOption,
  TipoResidenciaOption,
  getCidadesByEstadoOptions,
} from 'src/utils/options/form.options';

export default function CardDadosEndereco() {
  const { watch } = useFormContext();
  const estado = watch('estado');
  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={12} md={3}>
        <FormSelect name="tpLogradouro" options={TipoLogradouroOption} label="Tipo logradouro" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInputText name="logradouro" label="Logradouro" />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormInputText name="numero" label="Número" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInputText name="bairro" label="Bairro" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInputText name="cep" label="CEP" mask={{ format: '99999-999' }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect name="estado" options={EstadosOption} label="Estado" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect name="cidade" options={getCidadesByEstadoOptions(estado)} label="Cidade" disabled={!estado} />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormSelect name="tpResidencia" options={TipoResidenciaOption} label="Tipo residência" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormInputText name="nome" label="Nome" />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormInputText name="observacao" label="Observação" />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormCheckbox name="cobranca" label="Endereço de cobrança" />
        <FormCheckbox name="entrega" label="Endereço de entrega" />
      </Grid>
    </Grid>
  );
}
