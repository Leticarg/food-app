import { FlatList, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import { RestaurantItem } from './horizontal';
import { useCarrinho } from '../carrinho'; // Importar o contexto do Carrinho

export interface RestaurantsProps {
  restaurantId: string;
  name: string;
  image: string;
  price: number
}

export function Restaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const { adicionarAoCarrinho } = useCarrinho(); 

  useEffect(() => {
    async function getRestaurants() {
      const response = await fetch("http://192.168.2.106:3005/api/v1/restaurants");
      const data = await response.json();
      setRestaurants(data);
    }

    getRestaurants();
  }, []);

  const handleAddToCart = (item: RestaurantsProps) => {
    adicionarAoCarrinho({
      id: parseInt(item.restaurantId), 
      nome: item.name,
      preco: item.price,
      dia: '',
      quantidade: 1
    });
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <RestaurantItem item={item} />
          <Button
            title="Adicionar ao Carrinho"
            onPress={() => handleAddToCart(item)} 
          />
        </View>
      )}
      horizontal={false}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={true}
    />
  );
}
