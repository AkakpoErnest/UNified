import { useState, useCallback } from 'react';
import { CIRCLE_CONFIG, CirclePaymasterRequest, CirclePaymasterResponse } from '../config/circle';

export const useCirclePaymaster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sponsorUserOperation = useCallback(async (
    userOp: CirclePaymasterRequest,
    apiKey: string
  ): Promise<CirclePaymasterResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${CIRCLE_CONFIG.PAYMASTER_URL}/v1/paymaster/sponsor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(userOp),
      });

      if (!response.ok) {
        throw new Error(`Paymaster request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Circle Paymaster Error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const estimateGasFee = useCallback(async (
    chainId: number,
    transactionData: any
  ): Promise<string> => {
    // Simulate gas estimation for demo
    // In real implementation, this would call Circle's gas estimation API
    const baseGasFees: Record<number, string> = {
      11155111: '2.50', // Ethereum Sepolia
      84532: '0.25',    // Base Sepolia
      421614: '0.50',   // Arbitrum Sepolia
    };

    return baseGasFees[chainId] || '1.00';
  }, []);

  return {
    sponsorUserOperation,
    estimateGasFee,
    isLoading,
    error,
  };
};