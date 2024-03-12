import { yupResolver } from '@hookform/resolvers/yup';
import CardInformacoesBasicas from '@modules/auth/cadastro-usuario/components/cadastro-usuario-form/card-informacoes-basicas';
import MeusCartoes from '@modules/usuarios/components/meus-cartoes';
import MeusEnderecos from '@modules/usuarios/components/meus-enderecos';
import { useUsuarioQuery } from '@modules/usuarios/hooks/react-query/useUsuarioQuery';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.interface';
import { alteracaoUsuarioSchema } from '@modules/usuarios/validators/usuario-schema';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PATH_CLIENTE } from 'src/routes/paths';

export const MinhaContaSection = () => {
  const router = useRouter();
  const { handleSalvarUsuario, handleSalvarUsuarioIsLoading } = useUsuarioQuery();
  const [usuario, setUsuario] = useState<UsuarioInterface>({
    nome: '',
    genero: '',
    dataNascimento: new Date(),
    cpf: '',
    ddd: '',
    telefone: '',
    email: '',
    senha: '',
    isAdmin: false,
    status: true,
  });
  const methods = useForm({
    resolver: yupResolver(alteracaoUsuarioSchema),
  });

  useEffect(() => {
    const localUsuario = getStoredUser();
    setUsuario({ ...localUsuario });
  }, []);

  useEffect(() => {
    if (usuario) {
      // @ts-ignore
      methods.setValue('id', usuario.id);
      methods.setValue('nome', usuario.nome);
      methods.setValue('genero', usuario.genero);
      methods.setValue('dataNascimento', new Date(usuario.dataNascimento));
      methods.setValue('cpf', usuario.cpf);
      methods.setValue('ddd', usuario.ddd);
      methods.setValue('telefone', usuario.telefone);
      methods.setValue('email', usuario.email);
    }
  }, [usuario]);

  function getStoredUser() {
    if (typeof window !== 'undefined') {
      const UsuarioLocalStorage = localStorage.getItem('usuario');
      if (UsuarioLocalStorage !== null) {
        try {
          const usuarioData = JSON.parse(UsuarioLocalStorage);
          return usuarioData;
        } catch (error) {
          console.error(error);
        }
      }
    }
    return [];
  }

  const submitUsuario: SubmitHandler<UsuarioInterface> = async (usuarioData) => {
    try {
      const updateUser = await handleSalvarUsuario({ usuario: usuarioData, id: usuario.id ?? 0 });
      localStorage.setItem('usuario', JSON.stringify(updateUser));
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <CardInformacoesBasicas titulo="Minha conta" isEdit />
      <LoadingButton
        fullWidth
        variant="contained"
        loading={handleSalvarUsuarioIsLoading}
        onClick={() =>
          // @ts-ignore
          methods.handleSubmit(submitUsuario, (e) => {
            console.error(e);
          })()
        }
      >
        Salvar
      </LoadingButton>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={() =>
          // @ts-ignore
          router.push({
            pathname: PATH_CLIENTE.minha_conta.alterar_senha,
            query: { id: usuario.id },
          })
        }
      >
        Alterar Senha
      </Button>
      <MeusEnderecos />
      <MeusCartoes />
    </FormProvider>
  );
};
