import React from 'react';
import { Wallet, LogOut, Loader2, Zap } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export const WalletConnection: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (account) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-xl px-4 py-2 border border-green-400/30 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">{formatAddress(account)}</span>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-xl rounded-xl p-3 border border-red-400/30 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          title="Disconnect Wallet"
        >
          <LogOut className="w-5 h-5 text-red-300" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25 flex items-center gap-3 text-lg"
    >
      {isConnecting ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <div className="relative">
            <Wallet className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};