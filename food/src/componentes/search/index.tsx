import React, { useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SelectItem } from './select'; 

const options = [
  { id: '1', name: 'Feijoada' },
  { id: '2', name: 'Macarrão à Bolonhesa' },
  { id: '3', name: 'Bife de boi e fritas' },
  { id: '4', name: 'Estrogonofe' },
  { id: '5', name: 'Tropeiro' },
];

interface SearchProps {
  onSelect: (item: { id: string; name: string }) => void; 
}

export function Search({ onSelect }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent'>
        <Feather name='search' size={24} color="#64748b" />
        <TextInput
          placeholder="Procure sua comida..."
          className='w-full h-full flex-1 bg-transparent'
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} 
        />
      </View>

      {searchQuery ? (
        <FlatList
          data={filteredOptions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SelectItem item={item} onSelect={() => onSelect(item)} />
          )}
        />
      ) : null}
    </View>
  );
}