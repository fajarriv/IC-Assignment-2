import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import expenseRouter from "./routes/expense";

// console.log(uuidv4());
const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Routing
app.use("/expense", expenseRouter);