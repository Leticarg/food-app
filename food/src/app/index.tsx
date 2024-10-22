import {  View, TextInput, Button, StyleSheet, FlatList } from "react-native";
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { Header } from "../componentes/header";
import { Search } from "../componentes/search";
import { Section } from '../componentes/section';
import { TrendingFoods } from "../componentes/trending";
import { Restaurants } from "../componentes/restaurants";
import { CarrinhoVisual } from "../componentes/carrinho/carrinhovisual";
import { CarrinhoProvider, useCarrinho } from '../componentes/carrinho';

const statusBarHeight = Constants.statusBarHeight;

function HomeScreen() {
  const { adicionarAoCarrinho } = useCarrinho();
  const [address, setAddress] = useState('Rua Wilson Gonçaves, 164 ');
  const [paymentMethod, setPaymentMethod] = useState('Cartão de Crédito, debito, Pix ou Dinheiro');

  const handleSearchSelect = (item: { id: string; name: string }) => {
    console.log('Selected item:', item);
    adicionarAoCarrinho({ 
      id: Number(item.id), 
      dia: 'Semana', 
      nome: item.name, 
      preco: 50, 
      quantidade: 1 
    });
  };

  return (
    <>
      <FlatList
      data={null} 
      ListHeaderComponent={(
        <View>
          <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
            <Header />
            <Search onSelect={handleSearchSelect} />
          </View>

          <Section name="Cardápio da Semana" size="text-2xl" />
          <TrendingFoods />

          <Section name="Bebidas" size="text-2xl" />
          <Restaurants />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Endereço de entrega"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Forma de pagamento"
              value={paymentMethod}
              onChangeText={setPaymentMethod}
            />
          </View>

          <Button title="Finalizar Pedido" onPress={() => {
            console.log('Endereço:', address);
            console.log('Forma de Pagamento:', paymentMethod);
          }} />
        </View>
      )}
      renderItem={null}
      keyExtractor={(item, index) => index.toString()}
    />

      <CarrinhoVisual address={address} paymentMethod={paymentMethod} />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default function Index() {
  return (
    <CarrinhoProvider>
      <HomeScreen />
    </CarrinhoProvider>
  );
}