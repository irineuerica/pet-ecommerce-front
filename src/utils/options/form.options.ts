import { CIDADES } from 'src/constants/cidades';
import { TiposLogradouroEnum } from 'src/constants/enums/tipos-logradouro.enums';
import { TiposResidenciaEnum } from 'src/constants/enums/tipos-residencia.enum';
import { ESTADOS } from 'src/constants/estados';

export const TipoResidenciaOption = TiposResidenciaEnum.map((tipo) => {
  return { label: tipo.nome, value: tipo.nome };
});

export const TipoLogradouroOption = TiposLogradouroEnum.map((tipo) => {
  return { label: tipo.nome, value: tipo.nome };
});

export const EstadosOption = ESTADOS.map((estado) => {
  return { label: estado.nome, value: estado.nome };
});

export function getCidadesByEstadoOptions(selectedEstado: string) {
  const estado = ESTADOS.find((estado) => estado.nome === selectedEstado);
  const cidades = CIDADES.filter((cidade) => cidade.estado === estado?.id);
  return cidades?.map((cidade) => {
    return { label: cidade.nome, value: cidade.nome };
  });
}
