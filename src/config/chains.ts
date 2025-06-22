import { Chain } from '../types';

// Updated to use Circle's supported testnets
export const supportedChains: Chain[] = [
  {
    id: 11155111,
    name: 'Ethereum Sepolia',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.infura.io/v3/demo',
    blockExplorer: 'https://sepolia.etherscan.io',
    usdcAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    paymasterAddress: '0x1234567890123456789012345678901234567890',
    icon: '🔷'
  },
  {
    id: 84532,
    name: 'Base Sepolia',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    paymasterAddress: '0x2345678901234567890123456789012345678901',
    icon: '🔶'
  },
  {
    id: 421614,
    name: 'Arbitrum Sepolia',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    blockExplorer: 'https://sepolia.arbiscan.io',
    usdcAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
    paymasterAddress: '0x3456789012345678901234567890123456789012',
    icon: '🔵'
  }
];

export const getChainById = (chainId: number): Chain | undefined => {
  return supportedChains.find(chain => chain.id === chainId);
};

export const USDC_ADDRESSES: Record<number, string> = {
  11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Ethereum Sepolia
  84532: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',    // Base Sepolia
  421614: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',   // Arbitrum Sepolia
};

export const USDC_DECIMALS = 6;
export const DEFAULT_CHAIN_ID = 84532; // Base Sepolia as default