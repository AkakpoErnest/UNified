import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { supportedChains } from '../config/chains';
import { useWallet } from '../hooks/useWallet';

export const ChainSelector: React.FC = () => {
  const { chainId, switchChain, isConnected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentChain = supportedChains.find(chain => chain.id === chainId) || supportedChains[1]; // Default to Base

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChainSelect = async (targetChainId: number) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (targetChainId === chainId) {
      setIsOpen(false);
      return;
    }

    setIsSwitching(true);
    try {
      await switchChain(targetChainId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch chain:', error);
      alert('Failed to switch network. Please try again or add the network manually to your wallet.');
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={!isConnected || isSwitching}
        className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 text-white hover:bg-white/20 transition-all duration-200 min-w-[180px] shadow-xl hover:shadow-2xl hover:scale-105 ${
          !isConnected ? 'opacity-50 cursor-not-allowed' : ''
        } ${isSwitching ? 'opacity-75' : ''}`}
      >
        <span className="text-2xl">{currentChain.icon}</span>
        <div className="flex-1 text-left">
          <div className="font-semibold">
            {isSwitching ? 'Switching...' : currentChain.name}
          </div>
          <div className="text-xs text-blue-200/70">
            {!isConnected ? 'Connect wallet first' : currentChain.symbol}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isSwitching ? 'animate-spin' : ''}`} />
      </button>

      {isOpen && isConnected && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {supportedChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleChainSelect(chain.id)}
                disabled={isSwitching}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50/80 transition-all duration-200 rounded-lg ${
                  chainId === chain.id ? 'bg-blue-100/80 text-blue-700 shadow-sm' : 'text-gray-700'
                } ${isSwitching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-2xl">{chain.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{chain.name}</div>
                  <div className="text-xs opacity-70">Chain ID: {chain.id}</div>
                </div>
                {chainId === chain.id && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200/50 p-3 bg-gray-50/50">
            <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-3 h-3" />
              Switch networks to use UNified Gas on different chains
            </div>
          </div>
        </div>
      )}
    </div>
  );
};