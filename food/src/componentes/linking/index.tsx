import { Linking } from 'react-native';

export function sendOrderToWhatsApp(orderDetails: string) {

  const message = encodeURIComponent(orderDetails);
  const phone = '+5531985396148'; // Substitua pelo número de telefone desejado
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

  Linking.openURL(url).catch(err => {
    console.error("An error occurred while trying to open the URL:", err);
  });
}
