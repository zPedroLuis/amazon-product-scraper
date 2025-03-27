import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Bun rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});