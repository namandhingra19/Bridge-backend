import express from "express";
import { getBlockChains } from "../controllers/blockChains.controller";

const blockChainsRouter = express.Router();
blockChainsRouter.get("/", getBlockChains);

export default blockChainsRouter;
