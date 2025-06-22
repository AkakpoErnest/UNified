export interface Chain {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  usdcAddress: string;
  paymasterAddress: string;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'swap';
  hash: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  gasToken: string;
  gasFee: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
  chainId: number;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
  address: string;
}

export interface PaymasterConfig {
  paymasterUrl: string;
  chainId: number;
  supportedTokens: string[];
}

declare global {
  interface Window {
    ethereum?: any;
  }
}