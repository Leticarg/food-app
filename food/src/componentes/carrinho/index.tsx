import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir a interface para os itens do carrinho
interface ItemCarrinho {
  id: number;
  dia: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CarrinhoContextType {
  carrinho: ItemCarrinho[];
  adicionarAoCarrinho: (item: ItemCarrinho) => void;
  removerDoCarrinho: (id: number) => void;
  limparCarrinho: () => void; // Nova função para limpar o carrinho
}

// Criar o contexto do Carrinho
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

// Provedor do Carrinho
export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  // Função para adicionar um item ao carrinho
  const adicionarAoCarrinho = (item: ItemCarrinho) => {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(value => value.id === item.id);

      if (itemExistente) {
        // Se o item já está no carrinho, aumenta a quantidade
        return prevCarrinho.map(value =>
          value.id === item.id
            ? { ...value, quantidade: value.quantidade + 1 }
            : value
        );
      } else {
        // Se o item não está no carrinho, adiciona um novo
        return [...prevCarrinho, { ...item, quantidade: 1 }];
      }
    });
  };

  // Função para remover um item do carrinho
  const removerDoCarrinho = (id: number) => {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(item => item.id === id);

      if (itemExistente && itemExistente.quantidade > 1) {
        // Se o item tem quantidade maior que 1, apenas diminui a quantidade
        return prevCarrinho.map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      } else {
        // Se a quantidade for 1, remove o item do carrinho
        return prevCarrinho.filter(item => item.id !== id);
      }
    });
  };

  // Função para limpar completamente o carrinho
  const limparCarrinho = () => {
    setCarrinho([]); // Define o carrinho como um array vazio
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook para acessar o contexto do carrinho
export function useCarrinho() {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }

  return context;
}
