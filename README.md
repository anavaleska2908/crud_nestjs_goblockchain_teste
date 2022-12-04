<h1 align="center">
Teste prático para a empresa GoBlockchain
</h1>
<h3 align="center">Teste Prático - CRUD criado para a empresa GoBlockchain</h3>
<br/>
<p>
Seu objetivo é o gerenciamento de usuários. Nele é possível cadastrar usuários, listá-los, atualizar e deletar por id.
</p>  
<br/>

## **Tecnologias utilizadas:**
- Node.js
- Nestjs
- Typescript
- PostgreSQL
- Prisma
- Docker
- Bcryptjs
- Swagger

<br/>

## Rodando a aplicação:
- yarn install (para baixar as configurações do package.json)
- yarn db:dev:up (para criar toda a estrutura do banco de dados no docker e deixamos rodando no background)
- yarn prisma:dev:deploy (para dar deploy nas migrações para o banco de dados)
- npx prisma studio (caso queira ver as tabelas e futuramente os dados cadastrados)
- yarn start:dev (para rodar a aplicação. Esse comando é interessante caso queira fazer mudanças e atualizar automaticamente o sistema)
- yarn test:watch (para rodar os testes da aplicação e continuar com o sistema de testes rodando, mesmo após o retorno) 


## **Endpoints:**
A API tem, em seu total, 6 endpoints, permeando entre rotas de CRUD de usuário e login. <br/>

O url base da API é https://localhost:3333

<br/>
<hr/>

## Rotas que não precisam de autenticação:
<hr/>
<br/>
  
<h2 align ='center'>Criação de usuário</h2>

`POST /users - FORMATO DA REQUISIÇÃO`
```json
{
	"name": "Jane Doe",
	"email": "janedoe@email.com",
	"password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`
```json
{
  "id": "e70c7600-862f-4a0e-82ad-23f366468070",
	"name": "Jane Doe",
	"email": "janedoe@email.com",
	"password": "$2a$08$yK8sRj34T4xd1wtoNTR.BufrsEiGZpdJ8hv.BiLJUOuNPMfwENq4O",
	"createdAt": "2022-07-20T00:26:30.527Z",
	"updatedAt": "2022-07-20T00:26:30.527Z"
}
```

<h2 align ='center'>Possíveis erros:</h2>
Caso acabe errando, deixando de passar algum dos campos obrigatórios ou passando um email já existente, a resposta de erro será assim:

<br/>Campos Obrigatórios no `POST /users`: "name", "email", "password".

No exemplo, a requisição foi feita faltando o campo "password":
`POST /users - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"statusCode": 400,
	"message": [
		"name should not be empty",
		"name must be a string"
	],
	"error": "Bad Request"
}
``` 

Neste outro exemplo, a requisição foi feita com um email já cadastrado:

`POST /users - FORMATO DA RESPOSTA - STATUS 409`

```json
{
	"statusCode": 409,
	"message": "A account with this Email already exists.",
	"error": "Conflict"
}
```
<br/>

<h2 align ='center'> Listando usuários </h2>
Aqui conseguimos ver todas os usuários cadastrados.

`GET /users - FORMATO DA RESPOSTA - STATUS 200`
```json
[
  {
    "id": "e70c7600-862f-4a0e-82ad-23f366468070",
	  "name": "Jane Doe",
	  "email": "janedoe@email.com",
	  "password": "$2a$08$yK8sRj34T4xd1wtoNTR.BufrsEiGZpdJ8hv.BiLJUOuNPMfwENq4O",
	  "createdAt": "2022-07-20T00:26:30.527Z",
	  "updatedAt": "2022-07-20T00:26:30.527Z"
  },
]

```
<br/>

<h2 align = "center"> Login do usuário</h2>

`POST /login - FORMATO DA REQUISIÇÃO`
```json
{
  "email": "janedoe@email.com",
  "password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 200`
```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiIxMjM0NTY3ODkxMiIsInNlbmhhIjoiMTIzNDU2IiwiaWF0IjoxNjU4Mjc3MTgwLCJleHAiOjE2NTgzNjM1ODB9.w_rUTKgp7h4u_ejYJrpqAeE43GKKx1eORNudasUB2nA"

}
```
<h2 align ='center'>Possíveis erros:</h2>
Caso o usuário passe o "email" ou "password" errados, a resposta de erro será assim:

<br/>Campos Obrigatórios no `POST /login`: "email" e "password".

No exemplo, a requisição foi feita faltando o campo "password":
`POST /login - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"statusCode": 400,
	"message": [
		"password should not be empty",
		"password must be a string"
	],
	"error": "Bad Request"
}
``` 

Outro erro que pode acontecer ao passar um dos campos obrigatórios errado:
`POST /login - FORMATO DA RESPOSTA - STATUS 403`

```json
{
	"statusCode": 403,
	"message": "Email or password is incorrect.",
	"error": "Forbidden"
}
``` 
<br/>
<hr/>

## Rotas que necessitam de autorização:
<hr/>
<br/>

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir listar todos os usuários cadastrados e listar, atualizar e deletar um usuário específico.

<br/>

<h2 align ='center'> Listando um usuário </h2>
Você também pode listar um usuário específico, com o seguinte endpoint:

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "id": "e70c7600-862f-4a0e-82ad-23f366468070",
	"name": "Jane Doe",
	"email": "janedoe@email.com",
	"password": "$2a$08$yK8sRj34T4xd1wtoNTR.BufrsEiGZpdJ8hv.BiLJUOuNPMfwENq4O",
	"createdAt": "2022-07-20T00:26:30.527Z",
	"updatedAt": "2022-07-20T00:26:30.527Z"
}
```
<h2 align ='center'>Possíveis erros:</h2>
Caso o usuário não seja encontrado:

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 404`
```json
{
	"statusCode": 404,
	"message": "User not found",
	"error": "Not Found"
}
```

Quando não for passado o token na autorização, o seguinte erro ocorrerá:
`GET /users/:id - FORMATO DA RESPOSTA - STATUS 401`
```json
{
	"statusCode": 401,
	"message": "Unauthorized"
}
```

<h2 align ='center'> Atualizando um usuário </h2>
Há a possibilidade de atualizar os dados de um usuário específico, com o seguinte endpoint:

`PATCH /users/:id - FORMATO DA REQUISIÇÃO`
```json
{  
	"name": "Jane Doe Updated",
}
```
<br/>

Caso dê tudo certo, a resposta será assim:

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`
```json
{
	"id": "e70c7600-862f-4a0e-82ad-23f366468070",
	"name": "Jane Doe Updated",
	"email": "janedoe@email.com",
	"password": "$2a$08$yK8sRj34T4xd1wtoNTR.BufrsEiGZpdJ8hv.BiLJUOuNPMfwENq4O",
	"createdAt": "2022-12-03T06:27:22.641Z",
	"updatedAt": "2022-12-04T05:55:22.428Z"
}
```

<h2 align ='center'>Possíveis erros:</h2>
Caso o usuário não seja encontrado:

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 404`
```json
{
	"statusCode": 404,
	"message": "User not found",
	"error": "Not Found"
}
```

Quando não for passado o token na autorização, o seguinte erro ocorrerá:
`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 401`
```json
{
	"statusCode": 401,
	"message": "Unauthorized"
}
```
<br/>

<h2 align ='center'> Deletando um usuário </h2>
Também é possível deletar um usuário, utilizando esse endpoint:

`DELETE /users/:id`
```
Não é necessário um corpo da requisição.
```

Caso tudo dê certo, o status de retorno será 204.

Se um id de usuário não existente for passado, o erro retornado será assim:

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 404`
```json
{
	"statusCode": 404,
	"message": "User not found",
	"error": "Not Found"
}
```

Quando não for passado o token na autorização, o seguinte erro ocorrerá:
`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 401`
```json
{
	"statusCode": 401,
	"message": "Unauthorized"
}
```
