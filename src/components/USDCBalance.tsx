import React from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import { useUSDCBalance } from '../hooks/useUSDCBalance';

export const USDCBalance: React.FC = () => {
  const { balance, isLoading, refetch } = useUSDCBalance();

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
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
        ${balance} <span className="text-lg font-normal text-blue-200/70">USDC</span>
      </div>
      
      <div className="text-sm text-blue-200/70">
        Available for gas payments
      </div>
    </div>
  );
};