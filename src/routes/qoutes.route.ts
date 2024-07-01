import express from "express";
import { getBlockChains } from "../controllers/blockChains.controller";
import { sendQuoteRequest } from "../controllers/quotes.controller";

const qoutesRouter = express.Router();
qoutesRouter.post("/", sendQuoteRequest);

export default qoutesRouter;
