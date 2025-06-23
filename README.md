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
- [Prisma](https://www.prisma.io/) - ORM
- [SQLite](https://www.sqlite.org/) - Banco de dados
- [Supertest](https://github.com/visionmedia/supertest) - Testes de integração


## Setup do projeto

- Node.js v20+
- pnpm

```bash
$ git clone https://github.com/vanessafiori/golden-raspberry-awards-api.git
$ cd golden-raspberry-awards-api
$ pnpm install
$ npx prisma generate
```


## Executando a aplicação

```bash
# Desenvolvimento
$ pnpm start:dev

# Produção
$ pnpm build
$ pnpm start:prod
```


## Executando os testes

```bash
# e2e tests
$ pnpm test:e2e
```


## Rotas da API

GET /producers/award-intervals

Retorna os produtores com menor e maior intervalo entre vitórias consecutivas a partir de um arquivo CSV que deverá estar presente em src/assets/ e conter os campos: year;title;studios;producers;winner.

Exemplo de Resposta:
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


## Contato

Vanessa Fiori
- Portfólio - https://vanessa-fiori.web.app/
- Linkedin - https://www.linkedin.com/in/vanessa-fiori-a6399a211/
