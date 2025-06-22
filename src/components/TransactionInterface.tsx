import React, { useState } from 'react';
import { Send, ArrowRightLeft, Loader2, Zap, Info, DollarSign } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useUSDCBalance } from '../hooks/useUSDCBalance';
import { getChainById } from '../config/chains';

interface TransactionInterfaceProps {
  onTransaction: (type: string, data: any) => void;
}

export const TransactionInterface: React.FC<TransactionInterfaceProps> = ({ onTransaction }) => {
  const { account, chainId } = useWallet();
  const { balance } = useUSDCBalance();
  const [activeTab, setActiveTab] = useState<'send' | 'swap'>('send');
  const [isLoading, setIsLoading] = useState(false);
  
  const [sendData, setSendData] = useState({
    to: '',
    amount: '',
    token: 'ETH'
  });

  const [swapData, setSwapData] = useState({
    fromToken: 'ETH',
    toToken: 'USDC',
    amount: ''
  });

  const currentChain = getChainById(chainId || 8453);
  const estimatedGasFee = activeTab === 'send' ? '2.50' : '3.50';

  const handleSend = async () => {
    if (!sendData.to || !sendData.amount) return;
    
    setIsLoading(true);
    try {
      // Simulate transaction with Circle Paymaster
      await new Promise(resolve => setTimeout(resolve, 2000));
      onTransaction('send', {
        to: sendData.to,
        amount: sendData.amount,
        token: sendData.token,
        gasToken: 'USDC'
      });
      setSendData({ to: '', amount: '', token: 'ETH' });
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!swapData.amount) return;
    
    setIsLoading(true);
    try {
      // Simulate swap transaction with Circle Paymaster
      await new Promise(resolve => setTimeout(resolve, 2000));
      onTransaction('swap', {
        fromToken: swapData.fromToken,
        toToken: swapData.toToken,
        amount: swapData.amount,
        gasToken: 'USDC'
      });
      setSwapData({ fromToken: 'ETH', toToken: 'USDC', amount: '' });
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
        <p className="text-gray-300 mb-4">Start making transactions with USDC gas payments</p>
        <div className="text-sm text-gray-400 bg-white/5 rounded-lg p-3">
          All gas fees will be automatically paid in USDC using Circle Paymaster
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      {/* Current Chain Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentChain?.icon}</span>
          <div>
            <div className="text-white font-semibold">Connected to {currentChain?.name}</div>
            <div className="text-sm text-gray-300">Gas fees paid in USDC via Circle Paymaster</div>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex bg-white/5 rounded-xl p-1 mb-6">
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'send'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Send Tokens
        </button>
        <button
          onClick={() => setActiveTab('swap')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'swap'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4 inline mr-2" />
          Swap Tokens
        </button>
      </div>

      {/* Send Tab */}
      {activeTab === 'send' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Recipient Address
            </label>
            <input
              type="text"
              value={sendData.to}
              onChange={(e) => setSendData({ ...sendData, to: e.target.value })}
              placeholder="0x..."
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Amount & Token
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={sendData.amount}
                onChange={(e) => setSendData({ ...sendData, amount: e.target.value })}
                placeholder="0.0"
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <select
                value={sendData.token}
                onChange={(e) => setSendData({ ...sendData, token: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          {/* Gas Fee Info */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-green-300">USDC Gas Payment</span>
            </div>
            <div className="text-sm text-gray-300 mb-2">
              Estimated gas fee: <span className="text-green-400 font-semibold">${estimatedGasFee} USDC</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Circle Paymaster automatically converts and pays gas fees in USDC
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading || !sendData.to || !sendData.amount || parseFloat(balance) < parseFloat(estimatedGasFee)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
            {isLoading ? 'Processing Transaction...' : 'Send with USDC Gas'}
          </button>
        </div>
      )}

      {/* Swap Tab */}
      {activeTab === 'swap' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              From
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={swapData.amount}
                onChange={(e) => setSwapData({ ...swapData, amount: e.target.value })}
                placeholder="0.0"
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <select
                value={swapData.fromToken}
                onChange={(e) => setSwapData({ ...swapData, fromToken: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white/10 p-3 rounded-full">
              <ArrowRightLeft className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              To (Estimated)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={swapData.amount ? `~${(parseFloat(swapData.amount) * 2500).toFixed(2)}` : '~0.00'}
                disabled
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-gray-400"
              />
              <select
                value={swapData.toToken}
                onChange={(e) => setSwapData({ ...swapData, toToken: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          {/* Gas Fee Info */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-green-300">USDC Gas Payment</span>
            </div>
            <div className="text-sm text-gray-300 mb-2">
              Estimated gas fee: <span className="text-green-400 font-semibold">${estimatedGasFee} USDC</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Swap fees + gas fees both paid automatically in USDC
            </div>
          </div>

          <button
            onClick={handleSwap}
            disabled={isLoading || !swapData.amount || parseFloat(balance) < parseFloat(estimatedGasFee)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <ArrowRightLeft className="w-6 h-6" />
            )}
            {isLoading ? 'Processing Swap...' : 'Swap with USDC Gas'}
          </button>
        </div>
      )}

      {/* Balance Check Warning */}
      {parseFloat(balance) < parseFloat(estimatedGasFee) && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <Info className="w-4 h-4" />
            <span>Insufficient USDC balance for gas fees. You need at least ${estimatedGasFee} USDC.</span>
          </div>
        </div>
      )}
    </div>
  );
};