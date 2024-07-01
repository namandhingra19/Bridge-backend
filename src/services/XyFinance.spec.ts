import axios from "axios";
import XyFinanceService from "./XyFinance.service";
import {
  XY_FINANCE_API_BASE_URL,
  XY_FINANCE_API_DEFAULT_RECEIVER,
} from "../constants/apiEndPoints";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("XyFinanceService", () => {
  let xyFinanceService: any;

  beforeEach(() => {
    xyFinanceService = new XyFinanceService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchBlockChains should return blockChains and status 200 on successful API call", async () => {
    const mockData = ["chain1", "chain2"];

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await xyFinanceService.fetchBlockChains();

    expect(result).toEqual({
      blockChains: mockData,
      status: 200,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/supportedChains`
    );
  });

  it("fetchBlockChains should return error message and status 500 on API call failure", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const result = await xyFinanceService.fetchBlockChains();

    expect(result).toEqual({
      error: errorMessage,
      status: 500,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/supportedChains`
    );
  });

  it("fetchTokens should return data and status 200 on successful API call", async () => {
    const mockData = ["token1", "token2"];
    const mockChain = "ethereum";
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await xyFinanceService.fetchTokens(mockChain);

    expect(result).toEqual({
      data: mockData,
      status: 200,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/recommendedTokens?chainId=${mockChain}`
    );
  });

  it("fetchTokens should return error message and status 500 on API call failure", async () => {
    const errorMessage = "Network Error";
    const mockChain = "ethereum";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const result = await xyFinanceService.fetchTokens(mockChain);

    expect(result).toEqual({
      error: errorMessage,
      status: 500,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/recommendedTokens?chainId=${mockChain}`
    );
  });

  it("fetchQuote should return data and status 200 on successful API call", async () => {
    const mockResponseData = { quote: "some_quote_data" };
    mockedAxios.get.mockResolvedValueOnce({
      data: mockResponseData,
      status: 200,
    });

    const requestData = {
      srcChainId: "1",
      fromTokenAddress: "0xTokenAddress1",
      amount: "1000",
      destChainId: "2",
      toTokenAddress: "0xTokenAddress2",
    };

    const result = await xyFinanceService.fetchQuote(requestData);

    expect(result).toEqual({
      data: mockResponseData,
      status: 200,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/quote?srcChainId=${requestData.srcChainId}&srcQuoteTokenAddress=${requestData.fromTokenAddress}&srcQuoteTokenAmount=${requestData.amount}&dstChainId=${requestData.destChainId}&dstQuoteTokenAddress=${requestData.toTokenAddress}&slippage=1`
    );
  });

  it("fetchQuote should return error message and status 500 on API call failure", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const requestData = {
      srcChainId: "1",
      fromTokenAddress: "0xTokenAddress1",
      amount: "1000",
      destChainId: "2",
      toTokenAddress: "0xTokenAddress2",
    };

    const result = await xyFinanceService.fetchQuote(requestData);

    expect(result).toEqual({
      error: errorMessage,
      status: 500,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/quote?srcChainId=${requestData.srcChainId}&srcQuoteTokenAddress=${requestData.fromTokenAddress}&srcQuoteTokenAmount=${requestData.amount}&dstChainId=${requestData.destChainId}&dstQuoteTokenAddress=${requestData.toTokenAddress}&slippage=1`
    );
  });

  it("createTransaction should return data and status 200 on successful API call", async () => {
    const mockResponseData = { transaction: "some_transaction_data" };
    mockedAxios.get.mockResolvedValueOnce({
      data: mockResponseData,
      status: 200,
    });

    const requestData = {
      qoute: {
        srcChainId: "1",
        srcQuoteTokenAddress: "0xTokenAddress1",
        srcQuoteTokenAmount: "1000",
        dstChainId: "2",
        dstQuoteTokenAddress: "0xTokenAddress2",
      },
    };

    const result = await xyFinanceService.createTransaction(requestData);

    expect(result).toEqual({
      data: mockResponseData,
      status: 200,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/buildTx?srcChainId=${requestData.qoute.srcChainId}&srcQuoteTokenAddress=${requestData.qoute.srcQuoteTokenAddress}&srcQuoteTokenAmount=${requestData.qoute.srcQuoteTokenAmount}&dstChainId=${requestData.qoute.dstChainId}&dstQuoteTokenAddress=${requestData.qoute.dstQuoteTokenAddress}&slippage=1&receiver=${XY_FINANCE_API_DEFAULT_RECEIVER}&`
    );
  });

  it("createTransaction should return error message and status 500 on API call failure", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const requestData = {
      qoute: {
        srcChainId: "1",
        srcQuoteTokenAddress: "0xTokenAddress1",
        srcQuoteTokenAmount: "1000",
        dstChainId: "2",
        dstQuoteTokenAddress: "0xTokenAddress2",
      },
    };

    const result = await xyFinanceService.createTransaction(requestData);

    expect(result).toEqual({
      error: errorMessage,
      status: 500,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${XY_FINANCE_API_BASE_URL}/v1/buildTx?srcChainId=${requestData.qoute.srcChainId}&srcQuoteTokenAddress=${requestData.qoute.srcQuoteTokenAddress}&srcQuoteTokenAmount=${requestData.qoute.srcQuoteTokenAmount}&dstChainId=${requestData.qoute.dstChainId}&dstQuoteTokenAddress=${requestData.qoute.dstQuoteTokenAddress}&slippage=1&receiver=${XY_FINANCE_API_DEFAULT_RECEIVER}&`
    );
  });
});
