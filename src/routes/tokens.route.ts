import express from "express";
import { getTokens } from "../controllers/tokens.controller";

const tokenRouter = express.Router();
tokenRouter.get("/", getTokens);

export default tokenRouter;
