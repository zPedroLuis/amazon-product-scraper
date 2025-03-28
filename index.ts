import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

// Endpoint /api/scrape
app.get("/api/scrape", (req: Request, res: Response): void => {
  // Captura o parâmetro 'keyword' da query string
  const keyword = req.query.keyword;

  // Verifica se o parâmetro 'keyword' foi fornecido
  if (!keyword) {
    res.status(400).json({ error: "Parameter 'keyword' is required." });
    return; // Encerra a execução aqui
  }

  // Retorna uma resposta JSON simulada (mock)
  res.json({
    message: `Scraping for keyword: ${keyword}`,
  });
});

// Endpoint de teste básico
app.get("/", (req: Request, res: Response): void => {
  res.send("Servidor Bun rodando!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});