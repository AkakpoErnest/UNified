import React, { useState } from 'react';
import { Send, ArrowRightLeft, Loader2, Zap } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useUSDCBalance } from '../hooks/useUSDCBalance';

interface TransactionInterfaceProps {
  onTransaction: (type: string, data: any) => void;
}

export const TransactionInterface: React.FC<TransactionInterfaceProps> = ({ onTransaction }) => {
  const { account } = useWallet();
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
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
        <div className="text-gray-300 mb-4">Connect your wallet to start making transactions</div>
        <div className="text-sm text-gray-400">Gas fees will be paid automatically in USDC</div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      {/* Tab Selector */}
      <div className="flex bg-white/5 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
            activeTab === 'send'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Send
        </button>
        <button
          onClick={() => setActiveTab('swap')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
            activeTab === 'swap'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4 inline mr-2" />
          Swap
        </button>
      </div>

      {/* Send Tab */}
      {activeTab === 'send' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={sendData.to}
              onChange={(e) => setSendData({ ...sendData, to: e.target.value })}
              placeholder="0x..."
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={sendData.amount}
              onChange={(e) => setSendData({ ...sendData, amount: e.target.value })}
              placeholder="0.0"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Gas fees will be paid in USDC (~$2.50)</span>
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading || !sendData.to || !sendData.amount || parseFloat(balance) < 5}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isLoading ? 'Sending...' : 'Send Transaction'}
          </button>
        </div>
      )}

      {/* Swap Tab */}
      {activeTab === 'swap' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={swapData.amount}
                onChange={(e) => setSwapData({ ...swapData, amount: e.target.value })}
                placeholder="0.0"
                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={swapData.fromToken}
                onChange={(e) => setSwapData({ ...swapData, fromToken: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRightLeft className="w-6 h-6 text-gray-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value="~0.00"
                disabled
                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-gray-400"
              />
              <select
                value={swapData.toToken}
                onChange={(e) => setSwapData({ ...swapData, toToken: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Gas fees will be paid in USDC (~$3.50)</span>
          </div>

          <button
            onClick={handleSwap}
            disabled={isLoading || !swapData.amount || parseFloat(balance) < 5}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowRightLeft className="w-5 h-5" />
            )}
            {isLoading ? 'Swapping...' : 'Swap Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};