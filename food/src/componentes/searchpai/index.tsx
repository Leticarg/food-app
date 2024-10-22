import React from 'react';
import { View } from 'react-native';
import { Search } from '../search'; // Atualize o caminho conforme sua estrutura
import { TrendingFoods } from '../trending'; // Importe o componente que exibe as comidas

export function SearchAndDisplay() {
  const handleSelectFood = (item: { id: string; name: string }) => {
    console.log("Selected food:", item); 
    // Aqui você pode navegar para a página de detalhes ou adicionar ao carrinho
  };

  return (
    <View>
      <Search onSelect={handleSelectFood} />
      <TrendingFoods /> {/* Componente que exibe as comidas */}
    </View>
  );
}
