import { useState, useEffect } from 'react';
import { FlatList, Button, View } from 'react-native';
import { CardHorizontalFood } from './food';
import { useCarrinho } from '../carrinho'; 

export interface FoodProps {
  id: string;
  day: string;
  name: string;
  price: number;
  time: string;
  delivery: number;
  image: string;
  restaurantId: string;
}

export function TrendingFoods() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://192.168.2.106:3005/api/v1/foods");
      const data = await response.json();
      setFoods(data);
    }

    getFoods();
  }, []);


  const handleAddToCart = (item: FoodProps) => {
    adicionarAoCarrinho({
      id: parseInt(item.id),
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
            onPress={() => handleAddToCart(item)} 
          />
        </View>
      )}
      horizontal={false}
      contentContainerStyle={{ gap: 8, paddingLeft: 8, paddingRight: 16 }}
      showsHorizontalScrollIndicator={true}
    />
  );
}
