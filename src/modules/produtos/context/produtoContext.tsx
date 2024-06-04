import { createContext, useMemo, useState } from 'react';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import { useProduto } from '@modules/produtos/hooks/useProduto';

type Props = {
  children: React.ReactNode;
};

type AuthContextData = {
  produtos: ProdutoInterface[];
  produtosFiltrados: ProdutoInterface[];
  categoria: number;
  setCategoria: (value: number) => void;
  pesquisa: string;
  setPesquisa: (value: string) => void;
};

const ProdutoContext = createContext<AuthContextData>({} as AuthContextData);

function ProdutoProvider({ children }: Props) {
  const { produtos } = useProduto();
  const [categoria, setCategoria] = useState();
  const [pesquisa, setPesquisa] = useState();

  const produtosFiltrados = useMemo(() => {
    if (categoria) {
      return produtos.filter((produto) => produto.categoria.id === categoria);
    }
    if (pesquisa) {
      return produtos.filter((produto) => produto.nome.search(pesquisa) !== -1);
    }
    return produtos;
  }, [categoria, produtos, pesquisa]);

  return (
    <ProdutoContext.Provider
      // @ts-ignore
      value={{ produtosFiltrados, categoria, setCategoria, pesquisa, setPesquisa }}
    >
      {children}
    </ProdutoContext.Provider>
  );
}

export { ProdutoContext, ProdutoProvider };
