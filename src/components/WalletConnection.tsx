import React from 'react';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export const WalletConnection: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (account) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-2xl rounded-xl px-4 py-2 border border-blue-400/30 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">{formatAddress(account)}</span>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-2xl rounded-xl p-3 border border-red-400/30 transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-2xl"
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
      className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 flex items-center gap-3 text-lg backdrop-blur-xl border border-blue-400/30"
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full animate-ping"></div>
          </div>
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};