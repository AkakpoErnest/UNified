import React, { useState } from 'react';
import { WalletConnection } from './components/WalletConnection';
import { ChainSelector } from './components/ChainSelector';
import { USDCBalance } from './components/USDCBalance';
import { TransactionInterface } from './components/TransactionInterface';
import { TransactionHistory } from './components/TransactionHistory';
import { GasFeatureCard } from './components/GasFeatureCard';
import { SetupGuide } from './components/SetupGuide';
import { useWallet } from './hooks/useWallet';
import { Transaction } from './types';
import { Github, ExternalLink, Shield, Sparkles, Star } from 'lucide-react';

function App() {
  const { isConnected } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showSetupGuide, setShowSetupGuide] = useState(true);

  const handleTransaction = (type: string, data: any) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: type as 'send' | 'swap',
      hash: '0x' + Math.random().toString(16).substr(2, 64),
      from: '0x1234...5678',
      to: data.to,
      amount: data.amount,
      token: data.token,
      gasToken: 'USDC',
      gasFee: (Math.random() * 5 + 1).toFixed(2),
      status: 'success',
      timestamp: Date.now(),
      chainId: 84532 // Base Sepolia
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Silk-like animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/6 to-indigo-600/6 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Silk texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* UNified Logo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-2xl">
                  <img 
                    src="/unified_logo.jpg" 
                    alt="UNified Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400">
                  UNified
                </h1>
                <p className="text-sm text-blue-200/80 font-medium">Making Web3 Life Easy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ChainSelector />
              <WalletConnection />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          // Welcome Screen
          <div className="text-center py-20">
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl inline-block">
                <img 
                  src="/unified_logo.jpg" 
                  alt="UNified Logo" 
                  className="w-24 h-24 object-contain mx-auto"
                />
              </div>
            </div>
            
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 mb-4">
              UNified Gas
            </h2>
            <p className="text-2xl text-blue-100/90 mb-4 font-light">
              Making Web3 Life Easy
            </p>
            <p className="text-lg text-blue-200/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience seamless blockchain transactions with USDC gas payments. One token, all chains, zero friction. 
              Powered by Circle's innovative paymaster technology for the ultimate Web3 experience.
            </p>
            
            <div className="flex justify-center mb-12">
              <WalletConnection />
            </div>

            {/* Setup Guide */}
            <div className="max-w-4xl mx-auto">
              <SetupGuide />
            </div>
          </div>
        ) : (
          // Connected Dashboard
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {showSetupGuide && (
                <div className="relative">
                  <button
                    onClick={() => setShowSetupGuide(false)}
                    className="absolute top-4 right-4 text-blue-300/60 hover:text-white z-10 transition-colors duration-200"
                  >
                    ✕
                  </button>
                  <SetupGuide />
                </div>
              )}
              <TransactionInterface onTransaction={handleTransaction} />
              <TransactionHistory transactions={transactions} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <USDCBalance />
              <GasFeatureCard />
              
              {/* Enhanced Stats */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-400" />
                  Demo Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-400/20">
                    <span className="text-blue-100/90 font-medium">Test Transactions</span>
                    <span className="text-white font-bold text-lg">{transactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-400/20">
                    <span className="text-blue-100/90 font-medium">USDC Gas Used</span>
                    <span className="text-blue-300 font-bold text-lg">
                      ${(transactions.length * 2.5).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-400/20">
                    <span className="text-blue-100/90 font-medium">Success Rate</span>
                    <span className="text-blue-300 font-bold text-lg">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-2xl mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-2 rounded-xl border border-white/20">
                <img 
                  src="/unified_logo.jpg" 
                  alt="UNified Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400">
                  UNified Gas
                </div>
                <div className="text-sm text-blue-200/70">
                  Making Web3 Life Easy - DoraHacks 2025
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://developers.circle.com/docs/circle-paymaster-overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200/70 hover:text-blue-300 transition-colors flex items-center gap-2 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Circle Docs
              </a>
              <a
                href="https://faucet.circle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200/70 hover:text-blue-300 transition-colors flex items-center gap-2 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                USDC Faucet
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;