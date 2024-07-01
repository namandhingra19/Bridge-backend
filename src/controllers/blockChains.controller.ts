import { Request, Response } from "express";
import XyFinanceService from "../services/XyFinance.service";

export const getBlockChains = async (req: Request, res: Response) => {
  try {
    const xyFinanceService = new XyFinanceService();
    const blockChainResponse = await xyFinanceService.fetchBlockChains();
    if (blockChainResponse.status == 200) {
      const blockChains = blockChainResponse.blockChains.supportedChains;
      return res.status(200).json(blockChains);
    } else {
      return res.status(500).json({ error: blockChainResponse.error });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
