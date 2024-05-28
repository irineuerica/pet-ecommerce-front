import { useCupomQuery } from '@modules/cupons/hooks/react-query/useCupomQuery';
import { useSnackbar } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import { StatusCupom } from 'src/constants/enums/status-cupom';
import { TiposCupom } from 'src/constants/enums/tipos-cupom';
import { FRETES } from 'src/constants/fretes';
import { CarrinhoInterface, ItemCarrinhoInterface } from 'src/interfaces/carrinho.interface';
import { CartaoInterface, PagamentoInterface } from 'src/interfaces/cartao.interface';
import { CupomInterface } from 'src/interfaces/cupom.interface';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import { StatusPedidoEnum } from 'src/constants/enums/status-pedido.enum';
import { useSalvarPedido } from '../hooks/useSalvarPedido';

type PedidoContextData = {
  carrinho: CarrinhoInterface;
  total: number;
  subtotal: number;
  endereco: EnderecoInterface;
  enderecoCobranca: EnderecoInterface;
  pagamento: any;
  frete: number;
  desconto: number;
  itensCancelados: any;
  setCarrinho: (value: CarrinhoInterface) => void;
  deletarItem: (value: number) => void;
  adicionar: (value: ProdutoInterface) => void;
  setEndereco: (value: EnderecoInterface) => void;
  setEnderecoCobranca: (value: EnderecoInterface) => void;
  adicionarCartao: (value: CartaoInterface) => void;
  adicionarCupom: (value: string) => void;
  limpar: () => void;
  alterarQuantidade: (produtoId: number, quantidade: number) => void;
  calculaTotalPorCartao: () => void;
  salvarPedido: () => void;
};

const PedidoContext = createContext<PedidoContextData | undefined>(undefined);

interface PedidoProviderProps {
  children: React.ReactNode;
}

export const PedidoProvider: React.FC<PedidoProviderProps> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<CarrinhoInterface>({ itens: [] });
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [endereco, setEndereco] = useState<EnderecoInterface>();
  const [enderecoCobranca, setEnderecoCobranca] = useState<EnderecoInterface>();
  const [pagamento, setPagamento] = useState<PagamentoInterface>({ cupons: [], cartoes: [] });
  const [desconto, setDesconto] = useState(0);
  const [frete, setFrete] = useState<number>(0);
  const [itensCancelados, setItensCancelados] = useState<CarrinhoInterface>({ itens: [] });
  const [gamb, setGamb] = useState(0);
  const { cupons } = useCupomQuery();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSalvarPedido } = useSalvarPedido();

  useEffect(() => {
    calculaProdutos();
  }, [carrinho]);

  useEffect(() => {
    calculaTotal();
  }, [subtotal, frete, desconto]);

  useEffect(() => {
    if (endereco?.estado) {
      setFrete(FRETES[endereco.estado]);
    }
  }, [endereco?.estado]);

  useEffect(() => {
    validaTempoCarrinho()
  }, [gamb]);

  function calculaProdutos() {
    let valor = 0;
    if (carrinho && carrinho.itens?.length > 0)
      for (const item of carrinho?.itens) {
        valor += item.quantidade * item.produto?.valor;
      }
    setSubtotal(valor);
  }

  function calculaTotal() {
    if (frete) {
      setTotal(subtotal + frete - desconto);
    } else {
      setTotal(subtotal - desconto);
    }
  }

  function calculaTotalPorCartao() {
    if (pagamento?.cartoes.length === 0) {
      return 0;
    } else {
      return total / pagamento?.cartoes.length;
    }
  }

  function limpar() {
    setCarrinho({ itens: [] });
    setSubtotal(0);
    setTotal(0);
    setEndereco(undefined);
    setPagamento({ cupons: [], cartoes: [] });
    setDesconto(0);
    setFrete(0);
  }

  function calculaDescontos(valor: number) {
    let totalDesconto = valor + desconto;
    setDesconto(totalDesconto);
  }

  function deletarItem(produtoId: number) {
    let auxCarrinho = carrinho.itens?.filter(
      (itemCarrinho: ItemCarrinhoInterface) => itemCarrinho.produto.id !== produtoId,
    );
    setCarrinho({ itens: auxCarrinho });
  }

  function adicionar(produto: ProdutoInterface) {
    let index = carrinho?.itens?.findIndex((item) => item.produto?.id == produto.id);
    if (index && index != +-1 && carrinho) {
      let auxCarrinho = [...carrinho?.itens];
      auxCarrinho[index].quantidade += 1;
      auxCarrinho[index].tempoCarrinho = Date.now();
      setCarrinho({ itens: auxCarrinho });
    } else {
      let auxCarrinho = [...carrinho?.itens];
      const novoItem = {
        produto,
        quantidade: 1,
        tempoCarrinho: Date.now(),
      };
      auxCarrinho.push(novoItem);
      setCarrinho({ itens: auxCarrinho });
    }
  }

  async function cancelarItem(item: ItemCarrinhoInterface) {
    let cloneCancelados = [...itensCancelados?.itens];
    cloneCancelados.push(item);
    setItensCancelados({ itens: cloneCancelados });
  }

  async function validaTempoCarrinho() {
    var tempoMaximo = 120000;
    let indexsCancelados = [];
    if (carrinho.itens?.length > 0) {
      for (let i = 0; i <= carrinho.itens?.length; i++) {
        if (Date.now() - tempoMaximo > carrinho?.itens[i]?.tempoCarrinho) {
          await cancelarItem(carrinho?.itens[i]);
          indexsCancelados.push(i);
        }
      }
      for (const index of indexsCancelados) {
        deletarItem(index);
      }
    }
  }

  setInterval(function () {
    setGamb(gamb + 1);
  }, 60000);

  function adicionarCartao(cartao: CartaoInterface) {
    if (pagamento?.cartoes?.length === 0 && total > 10) {
      let auxPagamento = [...pagamento.cartoes];
      auxPagamento.push(cartao);
      setPagamento({ ...pagamento, cartoes: auxPagamento });
    } else if (pagamento?.cartoes?.length > 0) {
      if (!pagamento?.cartoes?.find((item) => item?.numero === cartao.numero)) {
        let auxPagamento = [...pagamento.cartoes];
        auxPagamento.push(cartao);
        setPagamento({ ...pagamento, cartoes: auxPagamento });
      }
    }
  }

  async function adicionarCupom(codigo: string) {
    if (desconto > total) {
      enqueueSnackbar('Valor de desconto maior que a compra', {
        variant: 'error',
      });
      return false;
    }
    const cuponsDisponiveis = cupons?.filter(
      (cupom: CupomInterface) => cupom.status && cupom.status === StatusCupom.DISPONIVEL,
    );
    const cupomSelecionado = cuponsDisponiveis?.find((cupom: CupomInterface) => cupom.codigo === codigo);
    if (!cupomSelecionado) {
      enqueueSnackbar('Cupom não encontrado', {
        variant: 'error',
      });
      return false;
    }
    if (validaCupom(cupomSelecionado) === false) {
      return false;
    }
    if (desconto < subtotal) {
      let auxPagamento = [...pagamento.cupons];
      auxPagamento.push(cupomSelecionado);
      setPagamento({ ...pagamento, cupons: auxPagamento });
      calculaDescontos(cupomSelecionado.valor);
      return cupomSelecionado;
    }
  }

  function validaCupom(cupomSelecionado: CupomInterface) {
    let cuponsTroca = pagamento?.cupons?.filter((item) => item?.tipo === TiposCupom.TROCA);
    let cuponsPromocionais = pagamento?.cupons?.filter((item) => item?.tipo === TiposCupom.PROMOCIONAL);

    if (cupomSelecionado.tipo === TiposCupom.TROCA && cuponsTroca && cuponsTroca.length > 0) {
      enqueueSnackbar('Só é possível utilizar um cupom de troca por pedido', {
        variant: 'error',
      });
      return false;
    }
    if (cupomSelecionado.tipo === TiposCupom.PROMOCIONAL && cuponsPromocionais && cuponsPromocionais.length > 0) {
      enqueueSnackbar('Só é possível utilizar um cupom promocional por pedido', {
        variant: 'error',
      });
      return false;
    }

    return true;
  }

  function alterarQuantidade(produtoId: number, quantidade: number) {
    let index = carrinho?.itens?.findIndex((item) => item.produto?.id === produtoId);
    let auxCarrinho = [...carrinho?.itens];
    auxCarrinho[index].quantidade = quantidade;
    setCarrinho({ itens: auxCarrinho });
  }

  async function salvarPedido() {
    const pedido = {
      items: carrinho?.itens,
      data: new Date(),
      valor: total,
      subtotal,
      status: StatusPedidoEnum.EM_PROCESSAMENTO,
      frete: frete,
      endereco: endereco,
      pagamento: pagamento,
    };
    //@ts-ignore
    await handleSalvarPedido({ pedido });
    limpar();
  }

  const contextoData: PedidoContextData = {
    carrinho,
    total,
    subtotal,
    // @ts-ignore
    endereco,
    // @ts-ignore
    enderecoCobranca,
    pagamento,
    frete,
    desconto,
    itensCancelados,
    setCarrinho,
    deletarItem,
    adicionar,
    setEndereco,
    setEnderecoCobranca,
    adicionarCartao,
    adicionarCupom,
    limpar,
    alterarQuantidade,
    calculaTotalPorCartao,
    salvarPedido,
  };

  return <PedidoContext.Provider value={contextoData}>{children}</PedidoContext.Provider>;
};

export default PedidoContext;
