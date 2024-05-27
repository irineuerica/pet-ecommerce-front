import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { CupomInterface } from 'src/interfaces/cupom.interface';
import { CupomService } from '@modules/cupons/services/cupom.service';
import { CupomKeysEnum } from '@modules/cupons/constants/usuario-keys.enums';

export function useCupomQuery() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleSalvarCupom, isLoading: handleSalvarCupomIsLoading } = useMutation(
    ({ cupom, id }: { cupom: CupomInterface; id?: number }) =>
      CupomService.getInstance().handleSalvarCupom({ cupom, id }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao salvar seus dados. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
      onSuccess() {
        enqueueSnackbar('Dados salvos com sucesso!', {
          variant: 'success',
          style: { whiteSpace: 'pre-line' },
          autoHideDuration: 10000,
        });
      },
    },
  );

  const { mutateAsync: getAllCupons, isLoading: getAllCuponsIsLoading } = useMutation(
    () => CupomService.getInstance().getAllCupons(),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao buscar seus dados. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
    
    },
  );


  const { mutateAsync: handleValidate, isLoading: handleValidateIsLoading } = useMutation(
    (codigo: string) => CupomService.getInstance().validate(codigo),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao validar seu cupom. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
    
    },
  );


  const { data: cupons, isLoading: cuponsIsloading } = useQuery([CupomKeysEnum.GET_BY_USER], () =>
    CupomService.getInstance().getCupons(),
  );

  return {
    cupons,
    cuponsIsloading,
    handleSalvarCupom,
    handleSalvarCupomIsLoading,
    getAllCupons,
    getAllCuponsIsLoading,
    handleValidate,
    handleValidateIsLoading
  };
}
