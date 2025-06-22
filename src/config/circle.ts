// Circle SDK Configuration for Testnet
export const CIRCLE_CONFIG = {
  // Circle Testnet Configuration
  API_BASE_URL: 'https://api-sandbox.circle.com',
  PAYMASTER_URL: 'https://paymaster-sandbox.circle.com',
  
  // Supported Testnet Chains for Circle
  SUPPORTED_CHAINS: {
    // Ethereum Sepolia Testnet
    11155111: {
      name: 'Ethereum Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
      usdcAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // USDC on Sepolia
      paymasterAddress: '0x...' // Circle Paymaster on Sepolia
    },
    // Base Sepolia Testnet
    84532: {
      name: 'Base Sepolia',
      rpcUrl: 'https://sepolia.base.org',
      usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
      paymasterAddress: '0x...' // Circle Paymaster on Base Sepolia
    },
    // Arbitrum Sepolia Testnet
    421614: {
      name: 'Arbitrum Sepolia',
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      usdcAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', // USDC on Arbitrum Sepolia
      paymasterAddress: '0x...' // Circle Paymaster on Arbitrum Sepolia
    }
  }
};

// Circle SDK Types
export interface CirclePaymasterRequest {
  userOperation: {
    sender: string;
    nonce: string;
    initCode: string;
    callData: string;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    paymasterAndData: string;
    signature: string;
  };
  chainId: number;
  entryPoint: string;
}

export interface CirclePaymasterResponse {
  paymasterAndData: string;
  preVerificationGas: string;
  verificationGasLimit: string;
  callGasLimit: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}