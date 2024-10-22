import { Pressable, Text, Image } from 'react-native';
import { RestaurantsProps } from '..';

export function RestaurantItem({ item }: { item: RestaurantsProps }) {
 return (
   <Pressable 
    className='flex flex-col rounded-xl relative'
    onPress={() => console.log("CLICOU NO RESTAURANTE " + item.name)}
    >
    <Image
      source={{ uri: item.image}}
      className="w-40 h-36 rounded-xl"
      />
    
    <Text className='text-black mt-1'>{item.name}</Text>
    <Text className='text-green-700 font-medium text-lg'>R$ {item.price}</Text>
   </Pressable>
  );
}