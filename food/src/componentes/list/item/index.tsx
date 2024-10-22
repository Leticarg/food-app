import { View} from 'react-native';
import { useState, useEffect } from 'react'
import { RestaurantItem } from '..'

export interface RestaurantsProps{
  restaurantId: string;
  name: string;
  image: string;
  price: number
}

export function RestaurantVerticalList() {
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([])

  useEffect(() => {
    async function getFoods(){
      const response = await fetch("http://192.168.2.106:3005/api/v1/restaurants")
      const data = await response.json()
      setRestaurants(data);
    }

    getFoods();
  }, [])


 return (
   <View className="px-4 flex-1 w-full h-full mb-11 gap-4">
    {restaurants.map( item => (
      <RestaurantItem item={item} key={item.restaurantId}/>
    ))}
   </View>
  );
}