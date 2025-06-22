import React from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import { useUSDCBalance } from '../hooks/useUSDCBalance';

export const USDCBalance: React.FC = () => {
  const { balance, isLoading, refetch } = useUSDCBalance();

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          USDC Balance
        </h3>
        <button
          onClick={refetch}
          disabled={isLoading}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-white ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="text-3xl font-bold text-white mb-2">
        ${balance} <span className="text-lg font-normal text-gray-300">USDC</span>
      </div>
      
      <div className="text-sm text-gray-300">
        Available for gas payments
      </div>
    </div>
  );
};