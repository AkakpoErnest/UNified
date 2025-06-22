import React, { useState } from 'react';
import { WalletConnection } from './components/WalletConnection';
import { ChainSelector } from './components/ChainSelector';
import { USDCBalance } from './components/USDCBalance';
import { TransactionInterface } from './components/TransactionInterface';
import { TransactionHistory } from './components/TransactionHistory';
import { GasFeatureCard } from './components/GasFeatureCard';
import { useWallet } from './hooks/useWallet';
import { Transaction } from './types';
import { Zap, Github, ExternalLink, Shield, Sparkles } from 'lucide-react';

function App() {
  const { isConnected } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
      chainId: 8453 // Base
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* UNified Logo */}
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl">
                  <div className="relative">
                    <Zap className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  UNified
                </h1>
                <p className="text-sm text-gray-300 font-medium">Universal Gas Payments</p>
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
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6 rounded-3xl inline-block shadow-2xl">
                <div className="relative">
                  <Zap className="w-20 h-20 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
              UNified Gas
            </h2>
            <p className="text-2xl text-gray-300 mb-4 font-light">
              One Token. All Chains. Zero Friction.
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of blockchain transactions with UNified Gas. Pay all network fees using USDC across 7 major chains. 
              No more juggling native tokens or worrying about gas fees. Just pure, seamless DeFi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Gas Abstraction</h3>
                <p className="text-gray-300 leading-relaxed">
                  Revolutionary gas payment system. Use USDC for all transaction fees across any supported network. No native tokens required.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ExternalLink className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Multi-Chain Unity</h3>
                <p className="text-gray-300 leading-relaxed">
                  Seamlessly operate across Ethereum, Base, Arbitrum, Optimism, Polygon, Avalanche, and Unichain with unified gas payments.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise Ready</h3>
                <p className="text-gray-300 leading-relaxed">
                  Built on Circle's robust infrastructure with enterprise-grade security, reliability, and developer-friendly integration.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <WalletConnection />
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">7</div>
                <div className="text-gray-400 font-medium">Supported Chains</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">$0</div>
                <div className="text-gray-400 font-medium">Setup Fees</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">100%</div>
                <div className="text-gray-400 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">24/7</div>
                <div className="text-gray-400 font-medium">Availability</div>
              </div>
            </div>
          </div>
        ) : (
          // Connected Dashboard
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <TransactionInterface onTransaction={handleTransaction} />
              <TransactionHistory transactions={transactions} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <USDCBalance />
              <GasFeatureCard />
              
              {/* Enhanced Stats */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Your UNified Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-300 font-medium">Total Transactions</span>
                    <span className="text-white font-bold text-lg">{transactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-300 font-medium">Gas Saved (USDC)</span>
                    <span className="text-green-400 font-bold text-lg">
                      ${(transactions.length * 2.5).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-300 font-medium">Success Rate</span>
                    <span className="text-green-400 font-bold text-lg">100%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-300 font-medium">Chains Used</span>
                    <span className="text-blue-400 font-bold text-lg">
                      {new Set(transactions.map(tx => tx.chainId)).size || 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-2 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  UNified Gas
                </div>
                <div className="text-sm text-gray-400">
                  Built for DoraHacks Hackathon 2025
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://developers.circle.com/docs/circle-paymaster-overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Circle Docs
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 font-medium"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;