# food-app
repositório para armazenar o código fonte do trabalho de extensão 
- Aplicativo de restaurante usando React Native + TailwindCss 
- Criado API para rodas as informações relacionadas ao app, usando SQLite
-  Usando Expo que é um framework para React Native para rodar o App, juntamente com emulador do Android Studio.

# Instruções para Rodar a Front

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```
Inicie o aplicativo, execute o seguinte comando:

```bash
npx expo start
```
 Na saída, você encontrará opções para abrir o aplicativo em um
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)
___
# Instruções para Rodar a API

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
npm run dev | nodemon server.js
```

## Se precisar modificar a tabela e resetá-la, siga os passos abaixo:

1 - Deletar o arquivo dev.sqlite3 <br>
2 - Executar o comando npx knex migrate:latest