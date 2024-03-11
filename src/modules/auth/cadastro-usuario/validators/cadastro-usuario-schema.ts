import * as yup from 'yup';

export const cadastroUsuarioSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  genero: yup.string().required('Genero é obrigatório'),
  dataNascimento: yup.date().required('Data de nascimento é obrigatória'),
  cpf: yup.string().required('CPF é obrigatório'),
  ddd: yup.string().required('DDD é obrigatório'),
  telefone: yup.string().required('Celular é obrigatório'),
  email: yup.string().required('E-mail é obrigatório'),
  senha: yup.string().required('Senha é obrigatória'),
  confirmarSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('senha')], 'Senhas não coincidem'),
});