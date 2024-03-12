import * as yup from 'yup';

export const cadastroEndereco = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  tpResidencia: yup.string().required('Tipo de residência é obrigatório'),
  tpLogradouro: yup.string().required('Tipo de logradouro é obrigatório'),
  logradouro: yup.string().required('Logradouro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatório'),
  estado: yup.string().required('Estado é obrigatório'),
  cobranca: yup.boolean(),
  entrega: yup.boolean(),
  observacao: yup.string(),
});

export const alterarEndereco = yup.object().shape({
  id: yup.number().required('ID é obrigatório'),
  nome: yup.string().required('Nome é obrigatório'),
  tpResidencia: yup.string().required('Tipo de residência é obrigatório'),
  tpLogradouro: yup.string().required('Tipo de logradouro é obrigatório'),
  logradouro: yup.string().required('Logradouro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatório'),
  estado: yup.string().required('Estado é obrigatório'),
  cobranca: yup.boolean(),
  entrega: yup.boolean(),
  observacao: yup.string(),
});

export const excluirSchema = yup.object().shape({
  id: yup.number().required('ID é obrigatório'),
});
