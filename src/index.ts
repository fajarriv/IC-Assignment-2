import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";

console.log(uuidv4());
const app: Express = express();
const port = process.env.PORT || 3000; 

// Middleware
app.use(morgan('tiny'))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
