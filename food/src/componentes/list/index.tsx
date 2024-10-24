import { Pressable } from 'react-native';
import { RestaurantsProps } from '../restaurants'

export function RestaurantItem({ item }: { item: RestaurantsProps }) {
  return (
    <Pressable 
     className='flex flex-col rounded-xl relative'
     onPress={() => console.log("CLICOU NO RESTAURANTE " + item.name)}
     >
    </Pressable>
   );
 }