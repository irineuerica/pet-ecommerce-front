import { CIDADES } from 'src/constants/cidades';
import { BandeirasEnum } from 'src/constants/enums/bandeiras.enum';
import { TiposLogradouroEnum } from 'src/constants/enums/tipos-logradouro.enums';
import { TiposResidenciaEnum } from 'src/constants/enums/tipos-residencia.enum';
import { ESTADOS } from 'src/constants/estados';
import { StatusById } from '../../constants/enums/status-pedido.enum';
import { CATEGORIA_MOCK } from '../../mocks/categorias.mock';

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

export const BandeirasOption = BandeirasEnum.map((bandeira) => {
  return { label: bandeira.nome, value: bandeira.nome };
});

export const StatusPedidoOption = StatusById.map((status) => {
  return { label: status.nome, value: status.id };
});

export const CategoriaOption = CATEGORIA_MOCK.map((categoria) => {
  return { label: categoria.nome, value: categoria.id };
});
