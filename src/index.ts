import express, { Request, Response } from "express";
import tokenRouter from "./routes/tokens.route";
import blockChainsRouter from "./routes/blockChains.route";
import qoutesRouter from "./routes/qoutes.route";
import paramsRouter from "./routes/params.route";
import cors from "cors";
const app = express();
app.use(cors());

const port = 5001;

app.use(express.json());

app.use("/api/v1/blockChains", blockChainsRouter);
app.use("/api/v1/tokens", tokenRouter);
app.use("/api/v1/quotes", qoutesRouter);
app.use("/api/v1/params", paramsRouter);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
