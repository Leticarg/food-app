import { useState, useEffect } from 'react';
import { FlatList, Button, View } from 'react-native';
import { CardHorizontalFood } from './food';
import { useCarrinho } from '../carrinho'; // Importar o contexto do Carrinho

export interface FoodProps {
  id: string;
  day: string;
  name: string;
  price: number;
  time: string;
  delivery: number;
  rating: number;
  image: string;
  restaurantId: string;
}

export function TrendingFoods() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const { adicionarAoCarrinho } = useCarrinho(); // Acessar a função de adicionar ao carrinho

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://192.168.2.106:3000/foods");
      const data = await response.json();
      setFoods(data);
    }

    getFoods();
  }, []);

  // Função para adicionar comida ao carrinho
  const handleAddToCart = (item: FoodProps) => {
    adicionarAoCarrinho({
      id: parseInt(item.id), // Converta para número se necessário
      dia: item.day,
      nome: item.name,
      preco: item.price,
      quantidade: 1
    });
  };

  return (
    <FlatList
      data={foods}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 1 }}>
          <CardHorizontalFood food={item} />
          <Button
            title="Adicionar ao Carrinho"
            onPress={() => handleAddToCart(item)} // Adicionar ao carrinho ao clicar
          />
        </View>
      )}
      horizontal={false}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={true}
    />
  );
}
