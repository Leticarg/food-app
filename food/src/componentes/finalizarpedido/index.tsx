import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useCarrinho } from '../carrinho';


interface FinalizarPedidoProps {
  address: string;
  paymentMethod: string;
  onSubmit: () => void; 
}

export const FinalizarPedido: React.FC<FinalizarPedidoProps> = ({ address, paymentMethod, onSubmit }) => {
  const { carrinho, limparCarrinho } = useCarrinho(); 
  const [loading, setLoading] = useState(false);

  const finalizarPedido = async () => {
    setLoading(true); 
    const pedidoData = {
      address,
      paymentMethod,
      items: carrinho.map(item => ({
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade,
      }))
    };

    try {
      const response = await fetch('http://localhost:3005/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Pedido Finalizado!',
          `Seu pedido será entregue em aproximadamente ${data.deliveryTime}.`
        );
        
        limparCarrinho();
        onSubmit();
      } else {
        Alert.alert('Erro ao finalizar pedido', data.message || 'Tente novamente mais tarde.');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>

      {carrinho.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text>{item.nome}</Text>
          <Text>Preço: R$ {item.preco}</Text>
          <Text>Quantidade: {item.quantidade}</Text>
        </View>
      ))}

      <Text style={styles.detail}>Endereço: {address || 'Endereço não informado'}</Text>
      <Text style={styles.detail}>Forma de Pagamento: {paymentMethod || 'Forma de pagamento não informada'}</Text>

      <Button
        title={loading ? "Processando..." : "Finalizar Pedido"}
        onPress={finalizarPedido}
        disabled={loading} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});