import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  limparCarrinho: () => void;
}


const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);


export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);


  const adicionarAoCarrinho = (item: ItemCarrinho) => {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(value => value.id === item.id);

      if (itemExistente) {
  
        return prevCarrinho.map(value =>
          value.id === item.id
            ? { ...value, quantidade: value.quantidade + 1 }
            : value
        );
      } else {

        return [...prevCarrinho, { ...item, quantidade: 1 }];
      }
    });
  };


  const removerDoCarrinho = (id: number) => {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(item => item.id === id);

      if (itemExistente && itemExistente.quantidade > 1) {

        return prevCarrinho.map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      } else {

        return prevCarrinho.filter(item => item.id !== id);
      }
    });
  };


  const limparCarrinho = () => {
    setCarrinho([]); 
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}


export function useCarrinho() {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }

  return context;
}
