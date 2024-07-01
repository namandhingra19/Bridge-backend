import { Request, Response } from "express";
import XyFinanceService from "../services/XyFinance.service";

export const createTransactionRequest = async (req: Request, res: Response) => {
  const { qoute } = req.body;
  const xyFinanceService = new XyFinanceService();
  const transactionResponse = await xyFinanceService.createTransaction({
    qoute,
  });
  if (transactionResponse.status == 200 && transactionResponse.data.success) {
    const transactionResult = transactionResponse.data.route;
    return res.status(200).json(transactionResult);
  } else if (transactionResponse.status == 200) {
    return res.status(500).json({ meesage: transactionResponse.data.errorMsg });
  } else {
    return res.status(500).json({ message: "Some error Occurred" });
  }
};
