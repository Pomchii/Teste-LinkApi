## TESTE_LINKAPI

● Criar contas testes nas plataformas Pipedrive e Bling.

● Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

● Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça

● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

● Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## Definições do Projeto
Clone o projeto com o comando: `git clone`.
Executar `npm install` para instalar as dependências do projeto.

O arquivo `.env` contem as informações para a conexão das plataformas, mongodb e definição do PORT.

`npm start` inicia a aplicação e `npm run dev` executa a aplicação em servidor local teste com o nodemon.



