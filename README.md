<h2 align="center">
  Golden Raspberry Awards API
</h2>


## Descrição

API desenvolvida com [NestJS](https://nestjs.com/) para armazenar dados de filmes indicados e vencedores do prêmio Golden Raspberry Awards e calcular estatísticas relevantes relacionadas aos produtores.


## Funcionalidades

- Importação de dados a partir de um arquivo CSV.
- Armazenamento de informações em banco de dados em memória (SQLite).
- Cálculo de produtores com maior e menor intervalo entre prêmios consecutivos.
- Exposição de endpoints RESTful.
- Testes de integração com Supertest.


## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Framework principal
- [TypeScript](https://www.typescriptlang.org/) - Linguagem
- [TypeORM](https://typeorm.io/) - ORM
- [SQLite](https://www.sqlite.org/) - Banco de dados
- [Supertest](https://github.com/visionmedia/supertest) - Testes de integração


## Pré-requisitos

- Node.js v20+
- npm 10.8.1

```bash
$ git clone https://github.com/vanessafiori/golden-raspberry-awards-api.git
$ cd golden-raspberry-awards-api
$ npm install
```

## Executando a aplicação

```bash
$ npm run start:dev
```

## Rotas da API

GET http://localhost:3000/producers/award-intervals

Retorna os produtores com menor e maior intervalo entre vitórias consecutivas a partir de um arquivo CSV que deverá estar presente em src/assets/ e conter os campos: year;title;studios;producers;winner.


- Exemplo de arquivo CSV:

year;title;studios;producers;winner
1980;Can't Stop the Music;Associated Film Distribution;Allan Carr;yes
1980;Cruising;Lorimar Productions, United Artists;Jerry Weintraub;
1980;The Formula;MGM, United Artists;Steve Shagan;

- Exemplo de Resposta:

{ 
  "min": [ 
    { 
      "producer": "Producer 1", 
      "interval": 1, 
      "previousWin": 2008, 
      "followingWin": 2009 
    }, 
    { 
      "producer": "Producer 2", 
      "interval": 1, 
      "previousWin": 2018, 
      "followingWin": 2019 
    } 
  ], 
  "max": [ 
    { 
      "producer": "Producer 1", 
      "interval": 99, 
      "previousWin": 1900, 
      "followingWin": 1999 
    }, 
    { 
      "producer": "Producer 2", 
      "interval": 99, 
      "previousWin": 2000, 
      "followingWin": 2099 
    } 
  ] 
} 


## Executando os testes

```bash
# e2e tests
$ npm run test:e2e
```


## Contato

Vanessa Fiori
- Portfólio - https://vanessa-fiori.web.app/
- Linkedin - https://www.linkedin.com/in/vanessa-fiori-a6399a211/