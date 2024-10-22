import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useCarrinho } from '..'; 


interface CarrinhoVisualProps {
  address: string;
  paymentMethod: string;
}

export function CarrinhoVisual({ address, paymentMethod }: CarrinhoVisualProps) {
  const { carrinho, removerDoCarrinho } = useCarrinho();

  const handleFinalizeOrder = () => {
    
    console.log('Endereço:', address);
    console.log('Forma de Pagamento:', paymentMethod);
    
  };

  return (
    <View style={styles.carrinhoContainer}>
      <Text style={styles.titulo}>Carrinho de Compras</Text>
      {carrinho.length === 0 ? (
        <Text style={styles.textoVazio}>O carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemNome}>{item.nome} (x{item.quantidade})</Text>
                  <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>
                </View>

                <Button
                  title="Remover"
                  onPress={() => removerDoCarrinho(item.id)}
                  color="#e74c3c" 
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text style={styles.endereco}>Endereço: {address}</Text>
          <Text style={styles.endereco}>Forma de Pagamento: {paymentMethod}</Text>
          

          <Button title="Finalizar Pedido" onPress={handleFinalizeOrder} />
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  carrinhoContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
    color: '#333',
  },
  textoVazio: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPreco: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  endereco: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
});
