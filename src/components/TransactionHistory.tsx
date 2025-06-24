import React from 'react';
import { History, ExternalLink, Send, ArrowRightLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Transaction } from '../types';
import { formatAddress, formatUSD } from '../utils/format';
import { getChainById } from '../config/chains';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-blue-300" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    return type === 'send' ? (
      <Send className="w-4 h-4 text-blue-400" />
    ) : (
      <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
    );
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 text-center shadow-xl">
        <History className="w-12 h-12 text-blue-300/60 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-blue-200/90 mb-2">No Transactions Yet</h3>
        <p className="text-blue-200/70">Your transaction history will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Transaction History</h3>
      </div>

      <div className="space-y-4">
        {transactions.slice(0, 10).map((tx) => {
          const chain = getChainById(tx.chainId);
          
          return (
            <div key={tx.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors border border-blue-400/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getTypeIcon(tx.type)}
                  <div>
                    <div className="text-white font-medium capitalize">
                      {tx.type} {tx.token}
                    </div>
                    <div className="text-sm text-blue-200/70">
                      {tx.to ? `To ${formatAddress(tx.to)}` : 'Token Swap'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(tx.status)}
                  <span className="text-sm text-blue-200/90 capitalize">{tx.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-blue-200/70">
                  Amount: <span className="text-white">{tx.amount} {tx.token}</span>
                </div>
                <div className="text-blue-200/70">
                  Gas: <span className="text-blue-300">{formatUSD(tx.gasFee)} USDC</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-sm">
                <div className="flex items-center gap-2 text-blue-200/70">
                  {chain?.icon} {chain?.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200/70">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </span>
                  {chain && (
                    <a
                      href={`${chain.blockExplorer}/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};