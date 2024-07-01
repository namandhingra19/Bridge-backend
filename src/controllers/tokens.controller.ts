import { Request, Response } from "express";
import XyFinanceService from "../services/XyFinance.service";

export const getTokens = async (req: Request, res: Response) => {
  const { chainId }: any = req.query;
  const xyFinanceService = new XyFinanceService();

  const tokensResponse = await xyFinanceService.fetchTokens(chainId);
  if (tokensResponse.status == 200 && tokensResponse.data.success) {
    const tokens = tokensResponse.data.recommendedTokens;
    return res.status(200).json(tokens);
  } else if (tokensResponse.status == 200) {
    return res.status(500).json({
      message: tokensResponse.data.errorMsg,
    });
  } else {
    return res.status(500).json({ message: "Some error Occurred" });
  }
};
