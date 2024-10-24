# Food App

Este é um repositório para armazenar o código-fonte do trabalho de extensão: um aplicativo de restaurante desenvolvido com **React Native** e **TailwindCSS**.

## Descrição

O aplicativo utiliza uma **API** que gerencia as informações relacionadas ao app, utilizando **SQLite** como banco de dados. O desenvolvimento é feito utilizando **Expo**, que é um framework para React Native, juntamente com um emulador do Android Studio.

### Ferramentas Utilizadas

- **React Native**: Para desenvolvimento de aplicativos móveis.
- **TailwindCSS**: Para estilização do aplicativo.
- **SQLite**: Como banco de dados para armazenamento de dados.
- **Expo**: Para facilitar o desenvolvimento e execução do aplicativo.
- **Insomnia**: Para testar a API.

## Instruções para Rodar o Frontend

Para instalar as dependências do projeto, siga os passos abaixo:

1. Navegue até o diretório do projeto do frontend onde foi executado o clone:
   

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

## Resetando o Banco de Dados
Se precisar modificar a tabela e resetá-la, siga os passos abaixo:

1 - Deletar o arquivo dev.sqlite3 <br>
2 - Executar o comando npx knex migrate:latest <br>
3 -  Execute o DELETAR diretamente da API, se necessário.

## Contribuição
Sinta-se à vontade para contribuir com o projeto! Se você tiver sugestões ou melhorias, abra uma issue ou envie um pull request.

## Licença
MIT License
