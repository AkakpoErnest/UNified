import { Chain } from '../types';

export const supportedChains: Chain[] = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://etherscan.io',
    usdcAddress: '0xA0b86a33E6441b04dE63a43ca76d1Ec1adb5F3a4',
    paymasterAddress: '0x1234567890123456789012345678901234567890',
    icon: '🔷'
  },
  {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://arbiscan.io',
    usdcAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    paymasterAddress: '0x2345678901234567890123456789012345678901',
    icon: '🔵'
  },
  {
    id: 8453,
    name: 'Base',
    symbol: 'ETH',
    rpcUrl: 'https://base-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://basescan.org',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    paymasterAddress: '0x3456789012345678901234567890123456789012',
    icon: '🔶'
  },
  {
    id: 10,
    name: 'Optimism',
    symbol: 'ETH',
    rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://optimistic.etherscan.io',
    usdcAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    paymasterAddress: '0x4567890123456789012345678901234567890123',
    icon: '🔴'
  },
  {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://polygonscan.com',
    usdcAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    paymasterAddress: '0x5678901234567890123456789012345678901234',
    icon: '🟣'
  },
  {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    usdcAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    paymasterAddress: '0x6789012345678901234567890123456789012345',
    icon: '❄️'
  },
  {
    id: 1301,
    name: 'Unichain',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.unichain.org',
    blockExplorer: 'https://sepolia.uniscan.xyz',
    usdcAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    paymasterAddress: '0x7890123456789012345678901234567890123456',
    icon: '🦄'
  }
];

export const getChainById = (chainId: number): Chain | undefined => {
  return supportedChains.find(chain => chain.id === chainId);
};

export const USDC_ADDRESSES: Record<number, string> = {
  1: '0xA0b86a33E6441b04dE63a43ca76d1Ec1adb5F3a4',
  42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  10: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  43114: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  1301: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
};

export const USDC_DECIMALS = 6;
export const DEFAULT_CHAIN_ID = 8453; // Base as default