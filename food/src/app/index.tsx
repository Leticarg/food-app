import {  View, Text, TextInput, Button, StyleSheet, FlatList, Modal, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { Header } from "../componentes/header";
import { Search } from "../componentes/search";
import { Section } from '../componentes/section';
import { TrendingFoods } from "../componentes/trending";
import { Restaurants } from "../componentes/restaurants";
import { CarrinhoVisual } from "../componentes/carrinho/carrinhovisual";
import { FinalizarPedido } from "../componentes/finalizarpedido";
import { CarrinhoProvider, useCarrinho } from '../componentes/carrinho';

function HomeScreen() {
  const { adicionarAoCarrinho } = useCarrinho(); 
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState('');
  const [submittedPaymentMethod, setSubmittedPaymentMethod] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false); 
  const [isPaymentEditing, setIsPaymentEditing] = useState(false); 
  const [isFinalizing, setIsFinalizing] = useState(false); 

  const handleSearchSelect = (item: { id: string; name: string }) => {
    adicionarAoCarrinho({
      id: Number(item.id),
      dia: 'Semana',
      nome: item.name,
      preco: 50,
      quantidade: 1,
    });
    setModalVisible(true); 
  };

  function handleAddressClick(): void {
    setIsAddressEditing(true);
    setIsPaymentEditing(false); 
    setModalVisible(true);
  }

  function handlePaymentClick(): void {
    setIsPaymentEditing(true);
    setIsAddressEditing(false); 
    setModalVisible(true);
  }

  function handleModalSubmit(): void {
    if (isAddressEditing) {
      setSubmittedAddress(address);
    }

    if (isPaymentEditing) {
      setSubmittedPaymentMethod(paymentMethod);
    }

    setModalVisible(false);
    setIsAddressEditing(false);
    setIsPaymentEditing(false);
  }

  function handleFinalizarPedido() {
    console.log('Pedido finalizado com sucesso');
    setIsFinalizing(false); 
  }


  return (
    <>
      <FlatList
        data={null} 
        ListHeaderComponent={(
          <View>
            <Header />
            <Search onSelect={handleSearchSelect} />

            <Section name="Cardápio da Semana" size="text-2xl" />
            <TrendingFoods />

            <Section name="Bebidas" size="text-2xl" />
            <Restaurants />
          </View>
        )}
        renderItem={null}
        keyExtractor={( index) => index.toString()}
      />
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isAddressEditing
                ? 'Editar Endereço'
                : isPaymentEditing
                ? 'Editar Forma de Pagamento'
                : 'Finalizar Pedido'}
            </Text>

            {isAddressEditing && (
              <TextInput
                style={styles.input}
                placeholder="Endereço de entrega"
                value={address}
                onChangeText={setAddress}
              />
            )}

            {isPaymentEditing && (
              <TextInput
                style={styles.input}
                placeholder="Forma de pagamento"
                value={paymentMethod}
                onChangeText={setPaymentMethod}
              />
            )}

            <Button title="Confirmar" onPress={handleModalSubmit} />
          </View>
        </View>
      </Modal>

      <CarrinhoVisual
        address={submittedAddress}
        paymentMethod={submittedPaymentMethod}
        onAddressClick={handleAddressClick}
        onPaymentClick={handlePaymentClick}
      />

{submittedAddress && submittedPaymentMethod && (
        <FinalizarPedido 
          address={submittedAddress} 
          paymentMethod={submittedPaymentMethod} 
          onSubmit={handleFinalizarPedido} 
         />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  orderDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default function Index() {
  return (
    <CarrinhoProvider>
      <HomeScreen />
    </CarrinhoProvider>
  );
}