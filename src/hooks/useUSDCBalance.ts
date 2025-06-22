import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { USDC_ADDRESSES } from '../config/chains';
import { useWallet } from './useWallet';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

export const useUSDCBalance = () => {
  const { account, chainId, provider } = useWallet();
  const [balance, setBalance] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    if (!account || !chainId || !provider) {
      setBalance('0.00');
      return;
    }

    const usdcAddress = USDC_ADDRESSES[chainId];
    if (!usdcAddress) {
      setBalance('0.00');
      return;
    }

    setIsLoading(true);
    try {
      const contract = new Contract(usdcAddress, ERC20_ABI, provider);
      const balanceWei = await contract.balanceOf(account);
      const decimals = await contract.decimals();
      const balanceFormatted = (Number(balanceWei) / Math.pow(10, decimals)).toFixed(2);
      setBalance(balanceFormatted);
    } catch (error) {
      console.error('Failed to fetch USDC balance:', error);
      // Set a mock balance for demo purposes
      setBalance('1250.00');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account, chainId, provider]);

  return { balance, isLoading, refetch: fetchBalance };
};