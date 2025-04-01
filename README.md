# Amazon Product Scraper

This is a simple scraper to fetch product listings on Amazon based on a provided keyword. The project is divided into two parts: the backend, which does the scraping and provides the data via API, and the frontend, which displays this data in a simple and user-friendly way.

## Features

- The backend is responsible for fetching product information from Amazon, such as title, rating, number of reviews, and image URL.
- The frontend is a simple interface where the user can enter a keyword and view the found products.

## Technologies Used

- **Backend**: Bun, Express, Axios, JSDOM
- **Frontend**: HTML, CSS, Vanilla JavaScript, Vite
- **Additional Dependencies**: axios-retry, cors

## Requirements

Before running the project, you need to have [Bun](https://bun.sh/) installed on your system. Additionally, the frontend requires Vite for development.

## How to Run

### Backend

1. Navigate to the `server` folder:
   ```bash
   cd server
2. Install the backend dependencies:
   ```bash
   bun install
3. To run the backend, execute:
   ```bash
   bun run index.ts
The server will be available at http://localhost:3000.

### Frontend

1. Navigate to the `client` folder:
   ```bash
   cd client
2. Install the frontend dependencies:
   ```bash
   npm install
3. To run the frontend, execute:
   ```bash
   npm run dev
The frontend will be available at http://localhost:5173.

## How to Use

1. Access the interface on the frontend at `http://localhost:5173`.
2. Enter a keyword in the search box and click "Search".
3. The corresponding products will be displayed, with information such as title, rating, number of reviews, and image.

## Endpoints

### /api/scrape
- **Method**: GET
- **Parameter**: `keyword` (keyword for search)

**Example request**:
```bash
GET http://localhost:3000/api/scrape?keyword=notebook
```

## The response will be a list of product objects, containing:

- `title`: Product title
- `rating`: Product rating
- `reviews`: Number of reviews
- `image`: Product image URL

## Considerations

- The project uses CORS to allow the frontend to access the API without issues.
- The backend implements axios-retry to retry in case of temporary request failures (status 503).
- The interface is designed to be simple and responsive.
