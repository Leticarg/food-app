import React from 'react';
import { View } from 'react-native';
import { Search } from '../search'; 
import { TrendingFoods } from '../trending'; 

export function SearchAndDisplay() {
  const handleSelectFood = (item: { id: string; name: string }) => {
    console.log("Selected food:", item); 

  };

  return (
    <View>
      <Search onSelect={handleSelectFood} />
      <TrendingFoods />
    </View>
  );
}
