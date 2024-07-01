import { Request, Response } from "express";
import XyFinanceService from "../services/XyFinance.service";

export const sendQuoteRequest = async (req: Request, res: Response) => {
  const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress } =
    req.body;
  const xyFinanceService = new XyFinanceService();
  const qoutesResponse = await xyFinanceService.fetchQuote({
    srcChainId,
    fromTokenAddress,
    amount,
    destChainId,
    toTokenAddress,
  });
  if (qoutesResponse.status == 200 && qoutesResponse.data.success) {
    const qoutes = qoutesResponse.data.routes[0];
    return res.status(200).json(qoutes);
  } else if (qoutesResponse.status == 200) {
    return res.status(500).json({
      message: qoutesResponse.data.errorMsg,
    });
  } else {
    return res.status(500).json({
      message: "Some Error Occurred",
    });
  }
};
