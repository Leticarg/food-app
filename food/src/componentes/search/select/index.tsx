import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Tipagem para o item e a função onSelect
interface SelectItemProps {
  item: {
    id: string;
    name: string;
  };
  onSelect: (item: { id: string; name: string }) => void;
}

export function SelectItem({ item, onSelect }: SelectItemProps) {
  return (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
}
