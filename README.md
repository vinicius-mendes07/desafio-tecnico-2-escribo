# Como testar a aplicação em produção

  Usar alguma plataforma de teste de APIs, como Postman, Insomnia ou similar
  com os seguintes endpoints:
  #### Criação de cadastro (sign up)

  endpoint: POST `https://desafio-tecnico-ku1h.onrender.com/users/signup`
  body:
  ```
  {
    "nome": "usuarioteste",
    "email": "usuarioteste@email.com",
    "senha": "123456",
    "telefones": [{ "numero": "123456789", "ddd": "11" }]
  }
  ```

   #### Autenticação (sign in)

  endpoint: POST `https://desafio-tecnico-ku1h.onrender.com/users/signin`
  body:
  ```
  {
    "email": "usuarioteste@email.com",
    "senha": "123456"
  }
  ```

   #### Buscar usuário

  endpoint: GET `https://desafio-tecnico-ku1h.onrender.com/users/[id]`
  - substitua o "[id]" acima pelo id de um usuário cadastrado
  - no header de Authorization coloque o valor de "Bearer {token}", substituindo o valor de "{token}" por um token válido, que é retornado pelas requisições de cadastrado e login

 ou acesse [minha workspace](https://www.postman.com/vinicius-mendes/workspace/desafio-tecnico/collection/23018639-c6f51315-8513-4fdb-80a0-f7cb00b9ac12?tab=overview)

# Como testar a aplicação localmente

- Ter nodejs installado.
- Ter postegresql instalado ou uma database postegresql em algum servidor online.
- Abrir o terminal na pasta do projeto e rodar o comando "npm install".
- Rodar os comandos sql que estão em "src/database/schema.sql" no banco de dados usado.
- Criar um arquivo .env com o valor "DATABASE_URL=[url de conexao]", substituindo "[url de conexão]" pela url de conexão do banco de dados.
- Rodar o comando "npm run dev".
- Abrir alguma ferramenta de teste de APIs e testar os mesmos endpoints citados no teste de ambiente de produção acima, trocando a url "`https://desafio-tecnico-ku1h.onrender.com`" por "`http://localhost:3000`". Por exemplo: se em produção está "`https://desafio-tecnico-ku1h.onrender.com/users/signin`", em ambiente local ficará "`http://localhost:3000/users/signin`". Fazer isso para todos os endpoints.
