import React, { useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SelectItem } from './select'; // Importando o componente SelectItem

// Tipagem das opções de comida
const options = [
  { id: '1', name: 'Frango assado' },
  { id: '2', name: 'Marmita fit' },
  { id: '3', name: 'Burguer Dev' },
  { id: '4', name: 'Picanha Grill' },
  { id: '5', name: 'Açai 300ml' },
  // Adicione mais opções conforme necessário
];

// Definindo a tipagem de props
interface SearchProps {
  onSelect: (item: { id: string; name: string }) => void; // Função que lida com a seleção do item
}

export function Search({ onSelect }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar as opções com base no texto de busca
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
          onChangeText={text => setSearchQuery(text)} // Atualiza o estado com o texto digitado
        />
      </View>

      {/* Lista de opções filtradas */}
      {searchQuery ? (
        <FlatList
          data={filteredOptions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SelectItem item={item} onSelect={() => onSelect(item)} /> // Usando o componente SelectItem
          )}
        />
      ) : null}
    </View>
  );
}