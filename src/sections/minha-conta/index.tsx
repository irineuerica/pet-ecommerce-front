import CardInformacoesBasicas from '@modules/auth/cadastro-usuario/components/cadastro-usuario-form/card-informacoes-basicas';
import MeusEnderecos from '@modules/usuarios/components/meus-enderecos';
import { useUsuarioQuery } from '@modules/usuarios/hooks/react-query/useUsuarioQuery';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.type';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export const MinhaContaSection = () => {
  const {handleSalvarUsuario, handleSalvarUsuarioIsLoading} = useUsuarioQuery();
  const [usuario, setUsuario] = useState<UsuarioInterface>({
    nome: '',
    genero: '',
    dataNascimento: new Date(),
    cpf: '',
    ddd: '',
    telefone: '',
    email: '',
    senha: ''
  })
  const methods = useForm();
  
  useEffect(() => {
    const localUsuario = getStoredUser()
    setUsuario({...localUsuario})
  }, [])

  useEffect(() => {
    if (usuario) {
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
    if (typeof window !== "undefined") {
      const UsuarioLocalStorage = localStorage.getItem('usuario')
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
      handleSalvarUsuario({usuario: usuarioData, id: usuario.id ?? 0});
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
           console.error(e)
          })()
        }
      >
        Salvar
      </LoadingButton>
      <MeusEnderecos/>
    </FormProvider>
  );
};
