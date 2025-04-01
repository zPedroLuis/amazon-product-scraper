import express, { type Request, type Response } from "express";
import axios from "axios";
import axiosRetry from "axios-retry";
import { JSDOM } from "jsdom";
import { setTimeout } from "timers/promises";
import cors from "cors";

const app = express();
const PORT = 3000;

// Interface para os produtos
interface Product {
  title: string;
  rating: string;
  reviews: string;
  image: string;
}

// Configurar retentativas com axios-retry
axiosRetry(axios, {
  retries: 3, // Número máximo de retentativas
  retryDelay: (retryCount) => {
    console.log(`Retrying... Attempt ${retryCount}`);
    return retryCount * 2000; // Espera 2 segundos por tentativa
  },
  retryCondition: (error) => {
    return error.response?.status === 503; // Só tenta novamente se o status for 503
  },
});

app.use(cors());

// Função para realizar o scraping
async function scrapeAmazon(keyword: string): Promise<Product[]> {
  await setTimeout(2000);
  try {
    // URL da página de resultados da Amazon
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Fazer a requisição HTTP com cabeçalhos adicionais
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Connection": "keep-alive",
      },
    });

    // Analisar o HTML com JSDOM
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Extrair os dados dos produtos
    const products: Product[] = [];
    const items = document.querySelectorAll("[data-component-type='s-search-result']");

    items.forEach((item: Element) => {
      const title = item.querySelector("h2[aria-label]")?.getAttribute("aria-label") || "N/A";    
      const ratingElement = item.querySelector(".a-icon-star-small .a-icon-alt");
      const reviewsElement = item.querySelector(".a-size-base.s-underline-text");
      const imageElement = item.querySelector(".s-image");
    
      const product: Product = {
        title: title,
        rating: ratingElement?.textContent?.trim() || "N/A",
        reviews: reviewsElement?.textContent?.trim() || "N/A",
        image: imageElement?.getAttribute("src") || "N/A",
      };
    
      products.push(product);
    });

    return products;
  } catch (error) {
    console.error("Error while scraping:", (error as Error).message);
    throw error;
  }
}

// Endpoint /api/scrape
app.get("/api/scrape", async (req: Request, res: Response): Promise<void> => {
  const keyword = req.query.keyword;

  if (!keyword) {
    res.status(400).json({ error: "Parameter 'keyword' is required." });
    return;
  }

  try {
    const products = await scrapeAmazon(String(keyword));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape data." });
  }
});

// Endpoint de teste básico
app.get("/", (req: Request, res: Response): void => {
  res.send("Servidor Bun rodando!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
