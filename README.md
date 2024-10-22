# food-app
repositório para armazenar o código fonte do trabalho de extensão 

# Instruções para Rodar a Front

...
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