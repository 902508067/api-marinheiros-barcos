# API Marinheiros & Barcos – Node.js

Este projeto foi desenvolvido no âmbito do curso UPSKILL 2026 e consiste numa API para gerir marinheiros, barcos e reservas.  
A API foi construída em Node.js, com ligação a uma base de dados Oracle construída em âmbito do Módulo de Base de Dados. Tem como objetivo integrar-se num projeto de APROG. 
Inclui validações, regras e uma coleção Postman com todos os endpoints organizados.


Tecnologias utilizadas:

- Node.js  
- OracleDB - SQL Developer 
- Postman  
- Git / GitHub  


## Estrutura do projeto

api-marinheiros-barcos/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── db/
│   └── services/
│
├── app.js
├── package.json
├── .env
├── README.md
└── API-MARINHEIROS_BARCOS_JORGE.postman_collection.json


## Instalação e configuração

1. Clonar o repositório:


2. Instalar dependências:


3. Criar o ficheiro '.env' com as credenciais da base de dados Oracle:

- DB_USER=xxxx
- DB_PASSWORD=xxxx
- DB_CONNECT_STRING=xxxx


4. Iniciar o servidor:

- Código: node app.js


A API fica disponível em:

- http://localhost:3000


## Endpoints disponíveis

### Marinheiros
- GET `/marinheiros`
- GET `/marinheiros/:id`
- POST `/marinheiros`
- PUT `/marinheiros/:id`
- DELETE `/marinheiros/:id`

### Barcos
- GET `/barcos`
- GET `/barcos/:id`
- POST `/barcos`
- PUT `/barcos/:id`
- DELETE `/barcos/:id`

### Reservas
- GET `/reservas`
- GET `/reservas/:id`
- POST `/reservas`
- PUT `/reservas/:id`
- DELETE `/reservas/:id`


## Regras

### Marinheiros
- Nome obrigatório  
- Classificação entre 1 e 5  
- Idade obrigatória  

### Barcos
- Nome obrigatório  
- Cor obrigatória  

### Reservas
- Não permite datas no passado  
- Verifica se o marinheiro existe  
- Verifica se o barco existe  
- Impede reservar o mesmo barco na mesma data  
- Impede conflitos de reservas  


## Testes com Postman

O projeto inclui uma coleção Postman com todos os endpoints:

- API-MARINHEIROS_BARCOS_JORGE.postman_collection.json


Para usar:

1. Abrir o Postman  
2. Importar a coleção  
3. Testar os endpoints  


## Autor

Projeto desenvolvido por Jorge Filipe Pereira no âmbito do curso UPSKILL 2026.


## Versão

v1.0.0 – Versão inicial da API.


*FIM





