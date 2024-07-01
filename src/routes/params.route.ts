import express from "express";
import { createTransactionRequest } from "../controllers/params.controller";

const paramsRouter = express.Router();
paramsRouter.post("/", createTransactionRequest);

export default paramsRouter;
