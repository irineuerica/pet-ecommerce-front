import * as yup from 'yup';
import moment from 'moment';

export const cadastroCartao = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  bandeira: yup.string().required('Bandeira é obrigatório'),
  vencimentoMes: yup.number().min(1, 'Mês inválido').max(12, 'Mês inválido').required('Mês de vencimento é obrigatório'),
  vencimentoAno: yup.number().min(moment().year(), 'Ano inválido').required('Ano de vencimento é obrigatório'),
  principal: yup.boolean()
});


export const alterarCartao = yup.object().shape({
    id: yup.number().required('Id é obrigatório'),
    nome: yup.string().required('Nome é obrigatório'),
    numero: yup.string().required('Número é obrigatório'),
    bandeira: yup.string().required('Bandeira é obrigatório'),
    vencimentoMes: yup.number().min(1, 'Mês inválido').max(12, 'Mês inválido').required('Mês de vencimento é obrigatório'),
    vencimentoAno: yup.number().min(moment().year(), 'Ano inválido').required('Ano de vencimento é obrigatório'),
    principal: yup.boolean()
  });