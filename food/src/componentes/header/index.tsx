import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'

export function Header() {
 return (
   <View className="w-full flex flex-row items-center justify-center">

      <View className="flex flex-col items-center justify-center">
        <Text className="text-center text-sm text-slate-950">FOOD APP</Text>

        <View className="flex-row items-center justify-center gap-1">
          <Feather name="map-pin" size={14} color="#FF0000" />
          <Text className="text-lg font-bold">Belo Horizonte</Text>
        </View>
      </View>
  </View>
  );
}