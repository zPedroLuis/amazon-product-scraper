# Amazon Product Scraper

Este é um simples scraper para buscar listagens de produtos na Amazon a partir de uma palavra-chave fornecida. O projeto está dividido em duas partes: o backend, que faz o scraping e fornece os dados via API, e o frontend, que exibe esses dados de maneira simples e amigável para o usuário.

## Funcionalidades

- O backend é responsável por buscar informações de produtos na Amazon, como título, avaliação, número de avaliações e URL da imagem.
- O frontend é uma interface simples onde o usuário pode inserir uma palavra-chave e visualizar os produtos encontrados.

## Tecnologias Usadas

- **Backend**: Bun, Express, Axios, JSDOM
- **Frontend**: HTML, CSS, Vanilla JavaScript, Vite
- **Dependências adicionais**: axios-retry, cors

## Requisitos

Antes de rodar o projeto, você precisa ter o [Bun](https://bun.sh/) instalado no seu sistema. Além disso, o frontend requer o Vite para desenvolvimento.

## Como Rodar

### Backend

1. Navegue até a pasta `server`:
   ```bash
   cd server
2. Instale as dependências do backend:
   ```bash
   bun install
3. Para rodar o backend, execute:
   ```bash
   bun run index.ts
O servidor estará disponível em http://localhost:3000.

### Frontend

1. Navegue até a pasta `client`:
   ```bash
   cd client
2. Instale as dependências do frontend `client`:
   ```bash
   npm install
3. Para rodar o frontend, execute:
   ```bash
   npm run dev
O frontend estará disponível em http://localhost:5173.

## Como Usar

1. Acesse a interface no frontend em `http://localhost:5173`.
2. Digite uma palavra-chave na caixa de pesquisa e clique em "Search".
3. Os produtos correspondentes serão exibidos, com informações como título, avaliação, número de avaliações e imagem.

## Endpoints

### /api/scrape
- **Método**: GET
- **Parâmetro**: `keyword` (palavra-chave para pesquisa)

**Exemplo de requisição**:
```bash
GET http://localhost:3000/api/scrape?keyword=notebook
```

## A resposta será uma lista de objetos de produtos, contendo:

- `title`: Título do produto
- `rating`: Avaliação do produto
- `reviews`: Número de avaliações
- `image`: URL da imagem do produto

## Considerações

- O projeto utiliza **CORS** para permitir que o frontend acesse a API sem problemas.
- O backend implementa o **axios-retry** para tentar novamente em caso de falhas temporárias na requisição (status 503).
- A interface foi projetada para ser simples e responsiva.
