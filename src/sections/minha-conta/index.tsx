import CardInformacoesBasicas from '@modules/auth/cadastro-usuario/components/cadastro-usuario-form/card-informacoes-basicas';
import MeusEnderecos from '@modules/usuarios/components/meus-enderecos';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.type';
import { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

export const MinhaContaSection = () => {
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

 

  console.log('methods', methods.getValues('nome'))

  return (
    <FormProvider {...methods}>
      <CardInformacoesBasicas titulo="Minha conta" isEdit />
      <MeusEnderecos/>
    </FormProvider>
  );
};
