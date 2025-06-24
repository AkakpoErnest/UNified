import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { supportedChains } from '../config/chains';
import { useWallet } from '../hooks/useWallet';

export const ChainSelector: React.FC = () => {
  const { chainId, switchChain } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentChain = supportedChains.find(chain => chain.id === chainId) || supportedChains[2]; // Default to Base

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChainSelect = async (chainId: number) => {
    try {
      await switchChain(chainId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 text-white hover:bg-white/20 transition-all duration-200 min-w-[180px] shadow-xl hover:shadow-2xl hover:scale-105"
      >
        <span className="text-2xl">{currentChain.icon}</span>
        <div className="flex-1 text-left">
          <div className="font-semibold">{currentChain.name}</div>
          <div className="text-xs text-blue-200/70">{currentChain.symbol}</div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {supportedChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleChainSelect(chain.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50/80 transition-all duration-200 rounded-lg ${
                  chainId === chain.id ? 'bg-blue-100/80 text-blue-700 shadow-sm' : 'text-gray-700'
                }`}
              >
                <span className="text-2xl">{chain.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{chain.name}</div>
                  <div className="text-xs opacity-70">{chain.symbol}</div>
                </div>
                {chainId === chain.id && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200/50 p-3 bg-gray-50/50">
            <div className="text-xs text-gray-500 text-center">
              Switch networks to use UNified Gas on different chains
            </div>
          </div>
        </div>
      )}
    </div>
  );
};