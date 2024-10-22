import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
