import axios from "axios";
import { XY_FINANCE_API_BASE_URL } from "../constants/apiEndPoints";

const generateQueryParams = (quoteResult: any) => {
  let queryParams = "";

  if (quoteResult.srcSwapDescription) {
    queryParams += `srcSwapProvider=${encodeURIComponent(
      quoteResult.srcSwapDescription.provider
    )}&`;
  }

  if (quoteResult.dstSwapDescription) {
    queryParams += `dstSwapProvider=${encodeURIComponent(
      quoteResult.dstSwapDescription.provider
    )}&`;
  }

  if (quoteResult.bridgeDescription) {
    queryParams += `bridgeProvider=${encodeURIComponent(
      quoteResult.bridgeDescription.provider
    )}&`;
    queryParams += `srcBridgeTokenAddress=${encodeURIComponent(
      quoteResult.bridgeDescription.srcBridgeTokenAddress
    )}&`;
    queryParams += `dstBridgeTokenAddress=${encodeURIComponent(
      quoteResult.bridgeDescription.dstBridgeTokenAddress
    )}&`;
  }

  // Remove trailing '&' if present
  if (queryParams.endsWith("&")) {
    queryParams = queryParams.slice(0, -1);
  }

  return queryParams;
};

export default class XyFinanceService {
  public fetchBlockChains = async () => {
    try {
      const response = await axios.get(
        `${XY_FINANCE_API_BASE_URL}/v1/supportedChains`
      );
      return {
        blockChains: response.data,
        status: 200,
      };
    } catch (error) {
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };
  public fetchTokens = async (chain: string) => {
    try {
      const response = await axios.get(
        `${XY_FINANCE_API_BASE_URL}/v1/recommendedTokens?chainId=${chain}`
      );
      return {
        data: response.data,
        status: 200,
      };
    } catch (error) {
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };

  public fetchQuote = async (data: {
    srcChainId: string;
    fromTokenAddress: string;
    amount: string;
    destChainId: string;
    toTokenAddress: string;
  }) => {
    try {
      const response = await axios.get(
        `${XY_FINANCE_API_BASE_URL}/v1/quote?srcChainId=${data.srcChainId}&srcQuoteTokenAddress=${data.fromTokenAddress}&srcQuoteTokenAmount=${data.amount}&dstChainId=${data.destChainId}&dstQuoteTokenAddress=${data.toTokenAddress}&slippage=1`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log(error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };
  public createTransaction = async (data: { qoute: any }) => {
    try {
      const response = await axios.get(
        `${XY_FINANCE_API_BASE_URL}/v1/buildTx?srcChainId=${
          data.qoute.srcChainId
        }&srcQuoteTokenAddress=${
          data.qoute.srcQuoteTokenAddress
        }&srcQuoteTokenAmount=${data.qoute.srcQuoteTokenAmount}&dstChainId=${
          data.qoute.dstChainId
        }&dstQuoteTokenAddress=${
          data.qoute.dstQuoteTokenAddress
        }&slippage=1&receiver=0xb6EFA1C3679f1943f8aC4Fc9463Cc492435c6C92&${generateQueryParams(
          data.qoute
        )}`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log(error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };
}
